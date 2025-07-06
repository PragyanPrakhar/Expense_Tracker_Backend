import { Router } from "express";
import { getOverBudgetCategories } from "../controllers/budgets/expensesAboveBudget.js";
import { addBudget } from "../controllers/budgets/addBudget.js";
// import { getBudgets } from "../controllers/budgets/getBudgets.js";
import { deleteBudget } from "../controllers/budgets/deleteBudget.js";
import { editBudget } from "../controllers/budgets/editBudget.js";
import { getBudgets } from "../controllers/budgets/getBudgets.js";

const router = Router();
router.get("/overBudgetCategories", getOverBudgetCategories);
router.post("/addBudget", addBudget);
// router.get("/getBudgets", getBudgets);
router.delete("/deleteBudget/:id", deleteBudget);
router.put("/editBudget/:id", editBudget);
router.get("/getBudgets", getBudgets)
export default router;

