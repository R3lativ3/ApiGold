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
exports.update = exports.create = exports.get = exports.getAllByRutaId = exports.getAll = void 0;
const prestamosService_1 = __importDefault(require("../services/prestamosService"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prestamosService_1.default.getAll();
        return res.json({ status: 0, response });
    }
    catch (e) {
        return res.json({ status: 1, response: e });
    }
});
exports.getAll = getAll;
const getAllByRutaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prestamosService_1.default.getAllByIdRuta(parseInt(req.params.id));
        return res.status(200).json(response);
    }
    catch (e) {
        return res.json({ status: 1, response: e });
    }
});
exports.getAllByRutaId = getAllByRutaId;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield prestamosService_1.default.get(parseInt(id));
        return res.json({ status: 0, response });
    }
    catch (e) {
        res.json({ status: 1, response: e });
    }
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const response = yield prestamosService_1.default.create(body);
        return res.json({ status: 0, response });
    }
    catch (e) {
        res.json({ status: 1, response: e });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const response = yield prestamosService_1.default.update(body, parseInt(id));
        return res.json({ status: 0, response });
    }
    catch (e) {
        res.json({ status: 1, response: e });
    }
});
exports.update = update;
//# sourceMappingURL=prestamosController.js.map