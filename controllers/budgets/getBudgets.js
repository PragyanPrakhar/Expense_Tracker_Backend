import Budget from "../../models/budget.model.js";
export const getBudgets = async (req, res) => {
    try {
        // Fetch all budgets from the database
        const budgets = await Budget.find();
        
        // Check if budgets exist
        if (!budgets || budgets.length === 0) {
            return res.status(404).json({ message: "No budgets found" });
        }

        // Return the list of budgets
        res.status(200).json(budgets);
    } catch (error) {
        console.error("Error fetching budgets:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};