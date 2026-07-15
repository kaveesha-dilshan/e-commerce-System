import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/create", protect, authorize("admin"), createProduct);

export default router;