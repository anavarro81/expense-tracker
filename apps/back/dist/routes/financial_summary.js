"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financial_summary_controller_1 = require("../controllers/financial_summary.controller");
const router = express_1.default.Router();
router.post("/", financial_summary_controller_1.createFinancialSummary);
router.get("/", financial_summary_controller_1.getAllFinancialSummaries);
exports.default = router;
