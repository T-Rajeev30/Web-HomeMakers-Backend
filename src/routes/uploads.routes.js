import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireCook } from "../middlewares/cook.js";
import * as ctrl from "../controllers/uploads.controller.js";

const router = Router();
router.use(requireAuth, requireCook);
router.post("/presign", ctrl.presign);
router.post("/confirm", ctrl.confirm);

export default router;
