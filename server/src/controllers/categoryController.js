import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required",
            });
        }

        const categoryExists = await Category.findOne({name});

        if (categoryExists) {
            return res.status(400).json({
                message: "Category already exists."
            })
        }

        const category = await Category.create({
            name,
            description,
        });
        console.log("hello");
        return res.status(201).json({
            message: "Category created successfully",
            category
        })
    } catch (error) {
        return res.status(500)({
            message: error.message,
        })
    }
}