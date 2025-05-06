"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transations_controller_1 = require("../controllers/transations.controller");
const transactionsRoute = express_1.default.Router();
transactionsRoute.get('/:month', transations_controller_1.getAllTransactionsByMonth);
transactionsRoute.get('/top-expenses/:month', transations_controller_1.getTopExpenses);
transactionsRoute.get('/monthly-expenses/:month', transations_controller_1.getTransactionsByWeek);
// transactionsRoute.post("/", newTransaction);
transactionsRoute.post("/load-transations", transations_controller_1.loadTransations);
exports.default = transactionsRoute;
