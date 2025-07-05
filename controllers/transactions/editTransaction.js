import Transaction from "../../models/expense.model.js";

export const editTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, date, description, category, type } = req.body;

        // Validate required fields
        if (!amount || !date || !description || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const validCategories = [
            "Food",
            "Rent",
            "Shopping",
            "Travel",
            "Bills",
            "Other",
        ];
        const validTypes = ["expense", "income"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({ error: "Invalid transaction type" });
        }

        // Find and update the transaction
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            {
                amount,
                date,
                description,
                category,
                type: type || "expense", // Default to 'expense' if not provided
            },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({
            message: "✅ Transaction updated successfully",
            transaction: updatedTransaction,
        });
    } catch (error) {
        console.error("❌ Error updating transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
