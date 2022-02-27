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
exports.update = exports.create = exports.getPrestamosByCliente = exports.get = exports.getAll = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'select * from clientes';
    const resx = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
    res.json({
        response: resx
    });
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let query = 'select * from clientes where id = :id';
    const resp = yield connection_1.default.query(query, {
        replacements: { id },
        type: sequelize_1.QueryTypes.SELECT
    });
    res.json({
        response: resp
    });
});
exports.get = get;
const getPrestamosByCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let query = 'select a.fecha as fechaPrestamo, b.nombres, b.apellidos, b.dpi, b.telefono, b.direccion, ' +
        'e.nombres as cobrador,  d.nombreRuta, f.montoEntregado, f.montoConInteres, f.plazoDias ' +
        'from prestamos a, clientes b, rutasCobradores c, rutas d, cobradores e, MontoPrestamos f ' +
        'where a.idCliente = b.id and a.idRutaCobrador = c.id and c.idRuta = d.id and c.idCobrador = e.id ' +
        'and a.idMonto = f.id and a.idCliente = :id';
    const resp = yield connection_1.default.query(query, {
        replacements: { id },
        type: sequelize_1.QueryTypes.SELECT
    });
    res.json({
        response: resp
    });
});
exports.getPrestamosByCliente = getPrestamosByCliente;
const create = (req, res) => {
    const { body } = req;
    console.log(body);
    res.json({
        msg: 'postUsuarios',
        body
    });
};
exports.create = create;
const update = (req, res) => {
    const { id } = req.params;
    const { body } = req.params;
    res.json({
        msg: 'putUsuarios',
        body,
        id
    });
};
exports.update = update;
//# sourceMappingURL=clientes.js.map