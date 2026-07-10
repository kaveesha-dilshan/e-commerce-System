import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createCategory} from "../controllers/categoryController.js";

router.post("/", protect, admin, createCategory)

const router = express.Router();