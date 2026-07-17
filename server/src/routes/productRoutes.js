import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", protect, authorize("admin"), createProduct);
router.get("/getallproducts", protect, getProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;