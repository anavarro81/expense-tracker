import { Request, Response } from "express";
import { FinancialSummary } from "../models/financial_summary.model";

// Crear uno nuevo
export const createFinancialSummary = async (req: Request, res: Response) => {
  try {
    const newSummary = new FinancialSummary(req.body);
    const savedSummary = await newSummary.save();
    res.status(201).json(savedSummary);
  } catch (error) {
    res.status(400).json({ message: "Error al crear FinancialSummary", error });
  }
};

// Obtener todos
export const getAllFinancialSummaries = async (_req: Request, res: Response) => {
  try {
    const summaries = await FinancialSummary.find();
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener FinancialSummaries", error });
  }
};
