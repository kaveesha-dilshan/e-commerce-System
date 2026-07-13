import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createCategory, getCategorise, getCategoryById,updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", protect, authorize("admin"), createCategory);
router.get("/allCategories", getCategorise);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);

export default router;