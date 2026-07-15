import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireCook } from "../middlewares/cook.js";
import * as ctrl from "../controllers/order.controller.js";

const router = Router();
router.use(requireAuth, requireCook);
router.get("/", ctrl.cookList);
router.patch("/:id/status", ctrl.cookUpdateStatus);

export default router;
