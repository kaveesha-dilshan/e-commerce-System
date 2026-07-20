import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", protect, createOrder);

export default router;