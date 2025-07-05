import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["Food", "Rent", "Shopping", "Travel", "Bills", "Other"], 
            required: true,
        },
        type: {
            type: String,
            enum: ["expense", "income"],
            default: "expense",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Transaction", transactionSchema);
