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
class Cobradores {
    static isValidCreateRequest(body) {
        if (body.nombres && body.apellidos && body.dpi && body.telefono && body.idUsuario)
            return true;
        return false;
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            INSERT INTO cobradores (nombres, apellidos, dpi, telefono, idUsuario) 
            VALUES (:nombres, apellidos, :dpi, :telefono, :idUsuario)
        `;
            try {
                const replacements = {
                    nombre: body.nombres,
                    apellidos: body.apellidos,
                    dpi: body.dpi,
                    telefono: body.telefono,
                    idUsuario: body.idUsuario
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.INSERT });
                const [results, metadata] = resp;
                return { success: true, message: "Cobrador creado: " + results + " filas afectadas: " + metadata };
            }
            catch (exception) {
                return { success: false, message: exception };
            }
        });
    }
    static update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            UPDATE cobradores 
            SET 
                nombres = :nombre, 
                apellidos = :apellidos, 
                dpi = :dpi, 
                telefono = :telefono, 
                idUsuario = :idUsuario
            WHERE id = :id
        `;
            const replacements = {
                nombre: body.nombres,
                apellidos: body.apellidos,
                dpi: body.dpi,
                telefono: body.telefono,
                idUsuario: body.idUsuario,
                id
            };
            try {
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.UPDATE });
                const [results, metadata] = resp;
                return { success: true, message: "Cobrador actualizado, " + results + " filas afectadas: " + metadata };
            }
            catch (exception) {
                return { success: false, message: exception };
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT a.id, 
                a.nombres, 
                a.apellidos, 
                a.dpi, 
                a.telefono, 
                c.nombreRuta, 
                d.sede
            FROM cobradores a 
            LEFT JOIN rutasCobradores b on a.id = b.idCobrador 
            LEFT JOIN rutas c on c.id = b.idRuta 
            LEFT JOIN sedesGold d on d.id = c.idSede  
        `;
            try {
                const resp = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT a.id,
                a.nombres, 
                a.apellidos, 
                a.dpi, 
                a.telefono, 
                c.nombreRuta, 
                d.sede 
            FROM cobradores a
            join rutasCobradores b on b.idCobrador = a.id
            join rutas c on c.id = b.idRuta
            join sedesGold d on d.id = c.idSede
            WHERE a.id = :id 
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT, plain: true });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    static getPrestamosByCobradorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT a.id,
                a.fecha as fechaEntrega, 
                c.nombre, 
                d.montoEntregado, 
                d.plazoDias, 
                d.montoConInteres
            FROM prestamos a 
            join rutasCobradores b on a.idRutaCobrador = b.id and b.idCobrador = :id
            join clientes c on c.id = a.idCliente
            join MontoPrestamos d on d.id = a.idMonto
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
}
exports.default = Cobradores;
//# sourceMappingURL=cobradores.service.js.map