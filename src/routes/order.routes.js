import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import * as ctrl from "../controllers/order.controller.js";

const router = Router();
router.use(requireAuth);
router.post("/", ctrl.create);
router.get("/mine", ctrl.mine);

export default router;
