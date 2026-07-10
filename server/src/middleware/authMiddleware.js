import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const decode = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = await User.findById(decode.id).select("-password");

            next();
        } else {
            return res.status(401).json({
                message: "Not authorized, no token",
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed",
        })
    }
}

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes)
    }
}