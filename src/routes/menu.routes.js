import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireCook } from "../middlewares/cook.js";
import * as ctrl from "../controllers/menu.controller.js";

const router = Router();
router.use(requireAuth, requireCook);
router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.patch("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
