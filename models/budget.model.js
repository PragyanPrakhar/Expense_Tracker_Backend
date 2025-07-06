import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema(
    {
        month: {
            type: String,
            required: true,
        },
        totalBudget: {
            type: Number,
            required: true,
        },
        category:{
            type: String,
            enum: ["Food", "Rent", "Shopping", "Travel", "Bills", "Other"], 
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Budget", budgetSchema);