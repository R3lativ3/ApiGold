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
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cobradores_1 = __importDefault(require("../services/Cobradores"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'select * from ';
    const resx = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
    res.json({
        response: resx
    });
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let query = 'select a.*, c.* from cobradores a, rutasCobradores b, rutas c'
        + 'where b.idCobrador = a.id and c.id = b.idRuta';
    const resp = yield connection_1.default.query(query, {
        replacements: { id },
        type: sequelize_1.QueryTypes.SELECT
    });
    res.json({
        response: resp
    });
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!Cobradores_1.default.isValidCreateRequest(body))
        res.status(400).json({ error: 'Invalid request body' });
    const response = yield Cobradores_1.default.create(body);
    res.json(response);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const response = yield Cobradores_1.default.update(body, parseInt(id));
    res.json(response);
});
exports.update = update;
//# sourceMappingURL=cobradores.js.map