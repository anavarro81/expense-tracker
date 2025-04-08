"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const bd_1 = require("./config/bd");
const app = (0, express_1.default)();
console.log('entro en server');
(0, bd_1.connectDB)();
app.use(express_1.default.json());
app.use('/', (req, res) => {
    res.send('Server is running');
});
exports.default = app;
