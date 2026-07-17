import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireCook } from "../middlewares/cook.js";
import { me } from "../controllers/profile.controller.js";

const router = Router();
router.use(requireAuth, requireCook);
router.get("/me", me);

export default router;
