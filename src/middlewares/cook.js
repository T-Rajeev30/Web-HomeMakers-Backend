import { Cook } from "../models/Cook.js";

export async function requireCook(req, res, next) {
  if (req.user.role !== "homemaker") {
    return res
      .status(403)
      .json({ error: "This action requires a homemaker account" });
  }
  try {
    let cook = await Cook.findOne({ zingroUserId: req.user.id });
    if (!cook) {
      cook = await Cook.create({
        zingroUserId: req.user.id,
        phone: req.user.phone,
      });
    }
    req.cookId = cook._id.toString();
    next();
  } catch (e) {
    next(e);
  }
}
