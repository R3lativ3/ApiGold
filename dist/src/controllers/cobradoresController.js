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
exports.getClientes = exports.update = exports.create = exports.get = exports.getAll = void 0;
const cobradoresService_1 = __importDefault(require("../services/cobradoresService"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield cobradoresService_1.default.getAll();
    if (resp.success)
        return res.status(200).json(resp.response);
    return res.status(500).json(resp.response);
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resp = yield cobradoresService_1.default.get(parseInt(id));
    if (resp.success && Object.keys(resp.response).length === 0)
        return res.status(404).json(resp.response);
    if (resp.success)
        return res.status(200).json(resp.response);
    return res.status(500).json(resp.response);
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!cobradoresService_1.default.isValidCreateRequest(body))
        res.status(400).json({ error: 'Invalid request body' });
    const response = yield cobradoresService_1.default.create(body);
    res.json(response);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const response = yield cobradoresService_1.default.update(body, parseInt(id));
    res.json(response);
});
exports.update = update;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield cobradoresService_1.default.getClientes(parseInt(id));
    res.json(response);
});
exports.getClientes = getClientes;
//# sourceMappingURL=cobradoresController.js.map