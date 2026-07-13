import { presignSchema, confirmSchema } from "../validators/uploads.schema.js";
import * as svc from "../services/uploads.service.js";

export async function presign(req, res, next) {
  try {
    const { type, contentType } = presignSchema.parse(req.body);
    res.json(await svc.createPresign(req.cookId, type, contentType));
  } catch (e) {
    next(e);
  }
}

export async function confirm(req, res, next) {
  try {
    const { type, key } = confirmSchema.parse(req.body);
    res.json(await svc.confirmUpload(req.cookId, type, key));
  } catch (e) {
    next(e);
  }
}
