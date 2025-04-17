import mongoose from "mongoose";

const FinancialSummarySchema = new mongoose.Schema({
  total_incomes: {
    type: Number,
    required: true,
    default: 0,
  },
  total_expenses: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const FinancialSummary = mongoose.model("FinancialSummary", FinancialSummarySchema);
