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
        const [nombreRuta, idSede, idMunicipio] = body;
        if (nombreRuta && idSede && idMunicipio)
            return true;
        return false;
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO rutas (nombreRuta, idSede, idMunicipio) VALUES (:nombreRuta, :idSede, :idMunicipio)`;
            try {
                const [nombreRuta, idSede, idMunicipio] = body;
                const resp = yield connection_1.default.query(query, {
                    replacements: { nombreRuta, idSede, idMunicipio },
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
            let query = `UPDATE rutas set nombreRuta = :nombreRuta, idSede = :idSede, idMunicipio = :idMunicipio where id = :id`;
            try {
                const [nombreRuta, idSede, idMunicipio] = body;
                const resp = yield connection_1.default.query(query, {
                    replacements: { nombreRuta, idSede, idMunicipio, id },
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
            let query = `
            SELECT  a.id, 
                    a.nombreRuta, 
                    e.sede, 
                    f.municipio, 
                    g.nombres, 
                    g.apellidos, 
                    count(b.idRutaCobrador) as cantidadClientes, 
                    sum(d.montoEntregado) as capital, 
                    sum(d.montoConInteres) as capitalGanancia, 
                    sum(d.cobroDiario) as cobroDiario
            FROM rutas a, prestamos b, rutasCobradores c, MontoPrestamos d, sedesGold e, municipios f, cobradores g
            WHERE a.id = c.idRuta and b.idRutaCobrador = c.id and b.activo = 1 and b.idMonto = d.id and e.id = a.idSede and f.id = a.idMunicipio and g.id = c.idCobrador
            GROUP BY a.id`;
            try {
                const resp = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
                return { success: true, response: resp };
            }
            catch (exception) {
                return { success: false, response: exception };
            }
        });
    }
    static ObtenerPrestamosPorRuta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT  a.fecha, 
                    c.montoEntregado, 
                    c.montoConInteres, 
                    c.cobroDiario, 
                    d.nombres, 
                    d.apellidos, 
                    sum(e.cobro)
            FROM prestamos a, rutasCobradores b, MontoPrestamos c, clientes d, CobrosPrestamos e
            WHERE a.idRutaCobrador = b.id and a.idMonto = c.id and d.id = a.idCliente and e.idPrestamo = a.id and b.idRuta = :id
            GROUP BY a.id`;
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
//# sourceMappingURL=rutasService.js.map