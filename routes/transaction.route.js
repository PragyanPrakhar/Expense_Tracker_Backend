import { Router } from "express";
import { addTransaction } from "../controllers/transactions/addTransaction.js";
import { getRecentTransactions } from "../controllers/transactions/getRecentTransactions.js";
import { getTotalExpense } from "../controllers/transactions/getTotalExpense.js";
import { getMonthlyTransactions } from "../controllers/transactions/getAllMonthsTransaction.js";
import { getCategoryWiseExpense } from "../controllers/transactions/getCategorywiseExpense.js";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.js";
import { editTransaction } from "../controllers/transactions/editTransaction.js";

const router = Router();

router.post("/addTransaction", addTransaction);
router.get("/recentTransactions", getRecentTransactions);
router.get("/totalExpense", getTotalExpense);
router.get("/monthlyTransactions", getMonthlyTransactions);
router.get("/categoryWiseExpense", getCategoryWiseExpense);
router.delete("/deleteTransaction/:id", deleteTransaction);
router.put("/editTransaction/:id", editTransaction);

export default router;

