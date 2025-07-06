import Budget from "../../models/budget.model.js";
export const editBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalBudget, month, category } = req.body;

        // Validate required fields
        if (!totalBudget || !month || !category) {
            return res
                .status(400)
                .json({
                    error: "Total budget, month, and category are required",
                });
        }

        // Find and update the budget
        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { totalBudget, month, category },
            { new: true }
        );

        if (!updatedBudget) {
            return res.status(404).json({ error: "Budget not found" });
        }

        res.status(200).json({
            message: "✅ Budget updated successfully",
            budget: updatedBudget,
        });
    } catch (error) {
        console.error("❌ Error updating budget:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
