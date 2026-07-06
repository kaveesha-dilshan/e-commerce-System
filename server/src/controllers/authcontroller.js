import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js"; 



// ****** REGISTER USER ******
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation 
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields must be filled",
            })
        }

        // check existing user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.status(200).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


// ****** USER LOGIN ******
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password){
            res.status(400).json({
                message: "Email and Password required"
            })
        }
        const user = await User.findOne({ email });

        if (!user) { 
            res.status(400).json({
                message: "User cannot Find"
            })
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid credentials"
            })
        }

        res.status(200).json({
            message: "Login Succussfull",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}