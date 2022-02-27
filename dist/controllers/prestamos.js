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
exports.update = exports.create = exports.getPrestamoDetail = exports.get = exports.getAll = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'select a.cobro, a.lat, a.lon, a.fecha, c.nombres, c.apellidos from CobrosPrestamos a, prestamos b, clientes c ' +
        'where a.idPrestamo = b.id and b.idCliente = c.id';
    const resx = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
    res.json({
        response: resx
    });
});
exports.getAll = getAll;
const get = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    });
};
exports.get = get;
const getPrestamoDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let header = 'select a.fecha as fechaPrestamo, b.nombres, b.apellidos, b.dpi, b.telefono, b.direccion, ' +
        'e.nombres as cobrador,  d.nombreRuta, f.montoEntregado, f.montoConInteres, f.plazoDias ' +
        'from prestamos a, clientes b, rutasCobradores c, rutas d, cobradores e, MontoPrestamos f ' +
        'where a.idCliente = b.id and a.idRutaCobrador = c.id and c.idRuta = d.id and c.idCobrador = e.id ' +
        'and a.idMonto = f.id and a.id = :id';
    const prestamo = yield connection_1.default.query(header, {
        replacements: { id },
        type: sequelize_1.QueryTypes.SELECT
    });
    let detail = 'select cobro, lat, lon, fecha from CobrosPrestamos where idPrestamo = :id';
    const pagos = yield connection_1.default.query(detail, {
        replacements: { id },
        type: sequelize_1.QueryTypes.SELECT
    });
    res.json({
        response: [
            prestamo,
            pagos
        ]
    });
});
exports.getPrestamoDetail = getPrestamoDetail;
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
//# sourceMappingURL=prestamos.js.map