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
        // console.log("hello");
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

export const getCategorise = async (req, res) => {
    try {
        const categories = await Category.find().sort({
            createdAt: -1,
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            })
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category){
            return res.status(404).json({
                message: "Category not found",
            })
        }

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();

        res.status(200).json({
            message: "Category Update successfully!",
            category: {
                id: category._id,
                name: category.name,
                description: category.description
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(404).json({
                message: "Category not founded",
            })
        }

        await category.deleteOne();

        res.status(200).json({
            message: "Catergory called --" + category.name + "-- deleted",
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        })
    }
}