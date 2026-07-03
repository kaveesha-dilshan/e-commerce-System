import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email"],
        },

        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters"],
        },

        role: {
            type: String,
            enum: ["user","admin"],
            default: "user"
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;