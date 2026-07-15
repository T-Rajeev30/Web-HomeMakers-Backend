import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.zingroJwtSecret);
    req.user = { id: decoded.id, phone: decoded.phone, role: decoded.role };
    next();
  } catch (err) {
    console.error("requireAuth failed:", err.name, err.message);
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    return res.status(500).json({ error: "Authentication processing failed" });
  }
}
