import express from "express";
import dotenv from "dotenv";
import connectDB from "../server/src/config/db.js";
import authRoutes from "../server/src/routes/authRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "E-commerce API runnig"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});