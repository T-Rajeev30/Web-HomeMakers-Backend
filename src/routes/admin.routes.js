import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/admin.js";
import * as ctrl from "../controllers/admin.controller.js";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/cooks", ctrl.listCooks);
router.get("/cooks/:id", ctrl.cookDetail);
router.post("/cooks/:id/decision", ctrl.decide);

export default router;
