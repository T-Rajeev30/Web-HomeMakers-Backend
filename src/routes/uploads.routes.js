import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import * as ctrl from "../controllers/uploads.controller.js";

const router = Router();
router.post("/presign", requireAuth, ctrl.presign);
router.post("/confirm", requireAuth, ctrl.confirm);

export default router;
