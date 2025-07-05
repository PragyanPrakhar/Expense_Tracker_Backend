import Transaction from "../../models/expense.model.js";

export const getRecentTransactions = async (req, res) => {
    try {
        // Optional: limit can come from query ?limit=5
        const limit = parseInt(req.query.limit) || 5;

        const transactions = await Transaction.find()
            .sort({ createdAt: -1 }) // latest first
            .limit(limit);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("❌ Error fetching recent transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
