import Budget from "../../models/budget.model.js";
export const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: "Budget ID is required" });
        }

        // Find and delete the budget
        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({ error: "Budget not found" });
        }

        res.status(200).json({
            message: "✅ Budget deleted successfully",
            budget: deletedBudget,
        });
    } catch (error) {
        console.error("❌ Error deleting budget:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
