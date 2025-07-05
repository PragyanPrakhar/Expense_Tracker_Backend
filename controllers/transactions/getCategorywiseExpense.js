import Transaction from "../../models/expense.model.js";

export const getCategoryWiseExpense = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $match: {
                    type: "expense", // only expenses
                },
            },
            {
                $group: {
                    _id: "$category", // group by category
                    total: { $sum: "$amount" }, // sum of amounts
                },
            },
            {
                $sort: { total: -1 }, // optional: sort from highest to lowest
            },
        ]);

        // Format result: turn _id into category
        const formatted = result.map((item) => ({
            category: item._id,
            total: item.total,
        }));

        res.status(200).json(formatted);
    } catch (error) {
        console.error("❌ Error getting category-wise expense:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
