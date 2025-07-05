import Transaction from "../../models/expense.model.js";
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!id) {
            return res
                .status(400)
                .json({ error: "Transaction ID is required" });
        }

        // Find and delete the transaction
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({
            message: "✅ Transaction deleted successfully",
            transaction: deletedTransaction,
        });
    } catch (error) {
        console.error("❌ Error deleting transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
