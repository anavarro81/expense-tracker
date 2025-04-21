"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transations_controller_1 = require("../controllers/transations.controller");
const transactionsRoute = express_1.default.Router();
transactionsRoute.post("/", transations_controller_1.newTransaction);
transactionsRoute.post("/load-transations", transations_controller_1.loadTransations);
transactionsRoute.get("/", transations_controller_1.getAllTransactions);
// Se usa el caracter ? para poder validar que no se mande el mes
transactionsRoute.get("/month/:month", transations_controller_1.getTransactionsByMonth);
transactionsRoute.get("/:id", transations_controller_1.getTransaction);
exports.default = transactionsRoute;
