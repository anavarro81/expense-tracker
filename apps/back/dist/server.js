"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const bd_1 = require("./config/bd");
const Categories_route_1 = __importDefault(require("./routes/Categories.route"));
const app = (0, express_1.default)();
const transations_routers_1 = __importDefault(require("./routes/transations.routers"));
const financial_summary_routes_1 = __importDefault(require("./routes/financial_summary.routes"));
(0, bd_1.connectDB)();
app.use(express_1.default.json());
// app.use('/', (req, res) => {
//     res.send('Server is running')
// })
console.log('Server is running...');
app.use('/categories', Categories_route_1.default);
app.use('/transations', transations_routers_1.default);
app.use('/financialSummary', financial_summary_routes_1.default);
exports.default = app;
