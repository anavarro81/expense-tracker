import express from "express";
import {
  createFinancialSummary,
  getAllFinancialSummaries,
} from "../controllers/financial_summary.controller";

const router = express.Router();

router.post("/", createFinancialSummary);
router.get("/", getAllFinancialSummaries);

export default router;
