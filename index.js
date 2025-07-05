import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transaction.route.js"; // Import transaction routes

dotenv.config();

const app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/transaction", transactionRoutes);
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("👍 Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
