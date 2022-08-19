"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.get = exports.getAll = void 0;
const cobrosService_1 = __importDefault(require("../services/cobrosService"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cobrosService_1.default.getAll();
        res.json({ status: 0, response });
    }
    catch (excepcion) {
        res.json({ status: 1, response: excepcion });
    }
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const response = yield cobrosService_1.default.get(parseInt(id));
        res.json({ status: 0, response });
    }
    catch (excepcion) {
        res.json({ status: 1, response: excepcion });
    }
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield cobrosService_1.default.create(body);
        res.json({ status: 0, response });
    }
    catch (excepcion) {
        res.json({ status: 1, response: excepcion });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const response = yield cobrosService_1.default.update(body, parseInt(id));
        res.json({ status: 0, response });
    }
    catch (excepcion) {
        res.json({ status: 1, response: excepcion });
    }
});
exports.update = update;
//# sourceMappingURL=cobrosController.js.map