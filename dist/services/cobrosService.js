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
class CobrosService {
    static isValidCreateRequest(body) {
        if (body.idPrestamo && body.cobro)
            return true;
        return false;
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            INSERT INTO CobrosPrestamos (cobro, idPrestamo, lat, lon, fecha)
            VALUES (:cobro, :idPrestamo, :lat, :lon, getdate())
        `;
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
                throw exception;
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
                throw exception;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select 
                a.idPrestamo,
                a.id, 
                a.cobro, 
                a.lat, 
                a.lon, 
                a.fecha,
                cli.nombre cliente,
                rut.nombreRuta ruta
            from CobrosPrestamos a
            join prestamos b on b.id = a.idPrestamo
            join clientes cli on cli.id = b.idCliente
            join rutasCobradores ruc on b.idRutaCobrador = ruc.id
            join rutas rut on ruc.idRuta = rut.id
        `;
            try {
                const resp = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
                return { success: true, response: resp };
            }
            catch (exception) {
                return { success: false, response: exception };
            }
        });
    }
    static get(idPrestamo) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select 
                a.id, 
                a.cobro, 
                a.lat, 
                a.lon, 
                a.fecha,
                cli.nombre cliente,
                rut.nombreRuta ruta
            from CobrosPrestamos a
            join prestamos b on b.id = a.idPrestamo
            join clientes cli on cli.id = b.idCliente
            join rutasCobradores ruc on b.idRutaCobrador = ruc.id
            join rutas rut on ruc.idRuta = rut.id
            where a.idPrestamo = :idPrestamo
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { idPrestamo }, type: sequelize_1.QueryTypes.SELECT });
                return { success: true, response: resp };
            }
            catch (exception) {
                return { success: false, response: exception };
            }
        });
    }
}
exports.default = CobrosService;
//# sourceMappingURL=cobrosService.js.map