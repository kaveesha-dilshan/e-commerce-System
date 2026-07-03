import User from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        res.status(201).json({
            message: "Register User API working"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}