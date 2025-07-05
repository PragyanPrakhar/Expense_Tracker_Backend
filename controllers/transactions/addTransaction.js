import Transaction from "../../models/expense.model.js";
export const addTransaction = async (req, res) => {
    try {
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
        // Create a new transaction
        const newTransaction = new Transaction({
            amount,
            date,
            description,
            category,
            type: type || "expense", // Default to 'expense' if not provided
        });

        // Save the transaction to the database
        await newTransaction.save();

        res.status(201).json({
            message: "✅ Transaction added successfully",
            transaction: newTransaction,
        });
    } catch (error) {
        console.error("❌ Error adding transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
