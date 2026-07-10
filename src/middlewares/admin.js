import { Cook } from "../models/Cook.js";

export async function requireAdmin(req, res, next) {
  try {
    const user = await Cook.findById(req.user.sub).select("role");
    if (!user || user.role !== "admin")
      return res.status(403).json({ error: "Admin access required" });
    next();
  } catch (e) {
    next(e);
  }
}
