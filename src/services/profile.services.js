import { Cook } from "../models/Cook.js";

export async function getMyProfile(cookId) {
  const cook = await Cook.findById(cookId).select(
    "phone email personal address food status currentStep createdAt",
  );
  if (!cook) throw Object.assign(new Error("Cook not found"), { status: 404 });
  return cook;
}
