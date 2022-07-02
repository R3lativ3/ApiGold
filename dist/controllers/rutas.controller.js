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
exports.update = exports.create = exports.ObtenerPrestamosPorRuta = exports.ObtenerTodos = void 0;
const rutas_service_1 = __importDefault(require("../services/rutas.service"));
const ObtenerTodos = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield rutas_service_1.default.getAll();
    if (resp.success)
        return res.status(200).json(resp.response);
    return res.status(500).json(resp.response);
});
exports.ObtenerTodos = ObtenerTodos;
const ObtenerPrestamosPorRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!parseInt(id))
        return res.status(400).json({ error: 'Invalid request params' });
    const resp = yield rutas_service_1.default.ObtenerPrestamosPorRuta(parseInt(id));
    if (resp.success)
        return res.status(200).json(resp.response);
    return res.status(500).json(resp.response);
});
exports.ObtenerPrestamosPorRuta = ObtenerPrestamosPorRuta;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!rutas_service_1.default.isValidCreateRequest(body))
        return res.status(400).json({ error: 'Invalid request body' });
    const response = yield rutas_service_1.default.create(body);
    return res.json(response);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const response = yield rutas_service_1.default.update(body, parseInt(id));
    return res.json(response);
});
exports.update = update;
//# sourceMappingURL=rutas.controller.js.map