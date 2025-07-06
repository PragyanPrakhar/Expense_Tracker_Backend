import Budget from "../../models/budget.model.js";
export const addBudget = async (req, res) => {
    try {
        const { totalBudget,month, category } = req.body;

        // Validate input
        if (!totalBudget || !category || !month) {
            return res.status(400).json({ error: "Amount , category and month are required" });
        }

        // Create a new budget entry
        const newBudget = new Budget({
            totalBudget,
            category,
            month,
        });

        // Save the budget to the database
        await newBudget.save();

        res.status(201).json({ message: "Budget added successfully", budget: newBudget });
    } catch (error) {
        console.error("❌ Error adding budget:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}