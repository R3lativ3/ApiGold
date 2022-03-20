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
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
class Prestamos {
    static isValidCreateRequest(body) {
        if (body.idPrestamo && body.cobro)
            return true;
        return false;
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO CobrosPrestamos (cobro, idPrestamo, lat, lon, fecha)
                    VALUES (:cobro, :idPrestamo, :lat, :lon, getdate())`;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: {
                        cobro: body.cobro,
                        idPrestamo: body.idPrestamo,
                        lat: body.lat,
                        lon: body.lon
                    },
                    type: sequelize_1.QueryTypes.INSERT
                });
                const [results, metadata] = resp;
                return { success: true, message: `ID: ${results}, affected rows: ${metadata}` };
            }
            catch (exception) {
                return { success: false, message: exception };
            }
        });
    }
    static update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `UPDATE CobrosPrestamos set cobro = :cobro where id = :id`;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: { cobro: body.cobro, id },
                    type: sequelize_1.QueryTypes.UPDATE
                });
                const [results, metadata] = resp;
                return { success: true, message: `Affected rows: ${metadata}` };
            }
            catch (exception) {
                return { success: false, message: exception };
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede '
                + 'from cobradores a '
                + 'left join rutasCobradores b '
                + '   on a.id = b.idCobrador '
                + 'left join rutas c '
                + '   on c.id = b.idRuta '
                + 'left join sedesGold d '
                + '   on d.id = c.idSede ';
            try {
                const resp = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
                return { success: true, response: resp };
            }
            catch (exception) {
                return { success: false, response: exception };
            }
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede '
                + 'from cobradores a, rutasCobradores b, rutas c, sedesGold d '
                + 'where b.idCobrador = a.id and c.id = b.idRuta and d.id = c.idSede and a.id = :id ';
            try {
                const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
                return { success: true, response: resp };
            }
            catch (exception) {
                return { success: false, response: exception };
            }
        });
    }
    static getClientes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select a.fecha as fechaEntrega, c.nombres, c.apellidos, d.montoEntregado, d.plazoDias, d.montoConInteres
            from prestamos a, rutasCobradores b, clientes c, MontoPrestamos d
            where a.idRutaCobrador = b.id and a.idCliente = c.id and a.idMonto = d.id and b.idCobrador = :id
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
                return { success: true, response: resp };
            }
            catch (exception) {
                return { success: false, response: exception };
            }
        });
    }
}
exports.default = Prestamos;
//# sourceMappingURL=cobros.service.js.map