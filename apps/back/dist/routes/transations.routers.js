"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transations_controller_1 = require("../controllers/transations.controller");
const transationsRouter = express_1.default.Router();
transationsRouter.post('/new-transation', transations_controller_1.newTransation);
exports.default = transationsRouter;
