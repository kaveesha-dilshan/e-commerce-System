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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let products;
        const keyword = req.query.keyword;
        if (keyword) {
            products = await Product.find({
                name: {
                    $regex: keyword,
                    $options : "i"
                }
            })
            .skip(skip)
            .limit(limit)
            .populate("category", "name")
            .sort({ createdAt: -1});
            console.log(products);
        }else{
            products = await Product.find()
                .skip(skip)
                .limit(limit)
                .populate("category", "name")
                .sort({ createdAt: -1});
                console.log(products);
        }
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

// create get product by id
export const getProductById = async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// create update product by id 
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            })
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = 0 || product.stock;

        await product.save();

        res.status(200).json({
            message: "Product update successfully",
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// create delete product by Id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            })
        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product delete successfully.",
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}