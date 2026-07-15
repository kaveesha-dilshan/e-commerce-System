import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

//  Create Create product controller
export const createProduct = async (req, res) => {
    try {
    const { name, description, price, stock, image, category} = req.body;

    if(!name || !description || !price || !stock || !category) {
        return res.status(400).json({
            message: "All feild must be filled",
        })
    }
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
        return res.status(404).json({
            message: "That categoty does not exits."
        })
    }
    const product = await Product.create({
        name,
        description,
        image,
        stock,
        price,
        category
    })
    res.status(201).json({
        message: "Product created successfully",
        product
    })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

// create get all products controller
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .sort({ createdAt: -1 });
        res.status(200).json({
            count: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// 
