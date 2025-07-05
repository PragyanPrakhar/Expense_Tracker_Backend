import Transaction from "../../models/expense.model.js";

export const getTotalExpense = async (req, res) => {
    try {
        const expenses = await Transaction.find({ type: "expense" });

        const total = expenses.reduce((sum, tx) => sum + tx.amount, 0);

        res.status(200).json({ totalExpense: total });
    } catch (error) {
        console.error("❌ Error calculating total expense:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
