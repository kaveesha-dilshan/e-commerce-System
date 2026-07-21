import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/:id", protect, getMyOrders);

export default router;