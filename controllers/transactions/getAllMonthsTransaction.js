import Transaction from "../../models/expense.model.js";

export const getMonthlyTransactions = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const monthlyTransactions = await Transaction.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: { "_id.month": 1 },
            },
        ]);

        // Format result: convert month number to name
        const monthNames = [
            "",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const result = monthlyTransactions.map((item) => ({
            month: monthNames[item._id.month],
            total: item.totalAmount,
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("❌ Error fetching monthly transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
