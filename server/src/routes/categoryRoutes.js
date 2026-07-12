import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createCategory} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", protect, authorize("admin"), createCategory);

export default router;