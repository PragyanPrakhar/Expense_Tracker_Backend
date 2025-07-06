import Transaction from "../../models/expense.model.js";
import Budget from "../../models/budget.model.js";

export const getOverBudgetCategories = async (req, res) => {
    try {
        const now = new Date();
        const month = now.toLocaleString("default", { month: "long" });
        const year = now.getFullYear();

        const startOfMonth = new Date(year, now.getMonth(), 1);
        const endOfMonth = new Date(
            year,
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
        );

        // 1. Get total expense by category for current month
        const expensesByCategory = await Transaction.aggregate([
            {
                $match: {
                    type: "expense",
                    date: { $gte: startOfMonth, $lte: endOfMonth },
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalSpent: { $sum: "$amount" },
                },
            },
        ]);

        // 2. Get budgets for current month
        const budgets = await Budget.find({ month });

        // 3. Merge expenses with budget info and filter if needed
        const result = expensesByCategory.map((expense) => {
            const budgetEntry = budgets.find((b) => b.category === expense._id);

            return {
                _id: expense._id,
                totalSpent: expense.totalSpent,
                budgetAmount: budgetEntry ? budgetEntry.totalBudget : 0,
            };
        });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching over-budget categories:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
