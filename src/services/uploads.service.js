import exifr from "exifr";
import { Cook } from "../models/Cook.js";
import { env } from "../config/env.js";
import { buildKey, presignPut, getObjectBytes } from "./s3.service.js";
import { distanceMeters } from "../utils/geo.js";

export async function createPresign(cookId, type, contentType) {
  const key = buildKey(cookId, type, contentType);
  const url = await presignPut(key, contentType);
  return { url, key };
}

// After browser PUTs to S3, client calls confirm. We read EXIF server-side,
// verify GPS is present and near the cook's declared GPS, then persist the key.
export async function confirmUpload(cookId, type, key) {
  if (!key.startsWith(`cooks/${cookId}/`))
    throw Object.assign(new Error("Key does not belong to cook"), {
      status: 403,
    });

  const cook = await Cook.findById(cookId);
  if (!cook) throw Object.assign(new Error("Cook not found"), { status: 404 });

  const bytes = await getObjectBytes(key);
  let gps = null;
  try {
    gps = await exifr.gps(bytes);
  } catch {
    gps = null;
  }

  const result = { type, key, gpsPresent: !!gps, gpsVerified: false };

  if (gps && cook.photos?.gps?.lat != null) {
    const dist = distanceMeters(
      { lat: gps.latitude, lng: gps.longitude },
      { lat: cook.photos.gps.lat, lng: cook.photos.gps.lng },
    );
    result.gpsVerified = dist <= env.gpsToleranceM;
    result.distanceMeters = Math.round(dist);
  }

  const field =
    type === "kitchen" ? "photos.kitchen_s3_key" : "photos.profile_s3_key";
  await Cook.updateOne({ _id: cookId }, { $set: { [field]: key } });

  return result;
}
