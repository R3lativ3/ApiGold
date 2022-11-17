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
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
class RutasService {
    constructor() { }
    isValidCreateRequest(body) {
        const [nombreRuta, idSede, idMunicipio] = body;
        if (nombreRuta && idSede && idMunicipio)
            return true;
        return false;
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO rutas (nombreRuta, idSede, idMunicipio) VALUES (:nombreRuta, :idSede, :idMunicipio)`;
            try {
                const replacements = {
                    nombreRuta: body.nombreRuta,
                    idSede: body.idSede,
                    idMunicipio: body.idMunicipio
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.INSERT });
                const [results, metadata] = resp;
                return { success: true, message: `Ruta creada: ${results}, filas afectadas: ${metadata}` };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `UPDATE rutas set nombreRuta = :nombreRuta, idSede = :idSede, idMunicipio = :idMunicipio where id = :id`;
            try {
                const replacements = {
                    nombreRuta: body.nombreRuta,
                    idSede: body.idSede,
                    idMunicipio: body.idMunicipio
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.UPDATE });
                const [results, metadata] = resp;
                return { success: true, message: `Ruta actualizada: ${metadata}, filas afectadas: ${results}` };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT  
                a.id, 
                a.nombreRuta, 
                e.sede, 
                f.municipio, 
                g.nombres, 
                g.apellidos, 
                count(b.idRutaCobrador) as cantidadClientes, 
                sum(d.montoEntregado) as capital, 
                sum(d.montoConInteres) as capitalGanancia, 
                sum(d.cobroDiario) as cobroDiario
            FROM rutas a
            join prestamos b on b.activo = 1
            join rutasCobradores c on c.idRuta = a.id and c.id = b.idRutaCobrador
            join MontoPrestamos d on d.id = b.idMonto
            join sedesGold e on e.id = a.idSede
            join municipios f on f.id = a.idMunicipio
            join cobradores g on g.id = c.idCobrador
            GROUP BY a.id
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
    getAllByIdSede(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT  
                a.id, 
                a.nombreRuta, 
                e.sede, 
                f.municipio, 
                g.nombres, 
                g.apellidos, 
                count(b.idRutaCobrador) as cantidadClientes, 
                sum(d.montoEntregado) as capital, 
                sum(d.montoConInteres) as capitalGanancia, 
                sum(d.cobroDiario) as cobroDiario
            FROM rutas a
            join prestamos b on b.activo = 1
            join rutasCobradores c on c.idRuta = a.id and c.id = b.idRutaCobrador
            join MontoPrestamos d on d.id = b.idMonto
            join sedesGold e on e.id = a.idSede
            join municipios f on f.id = a.idMunicipio
            join cobradores g on g.id = c.idCobrador
            WHERE a.idSede = :id
            GROUP BY a.id
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
    ObtenerPrestamosPorRuta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT a.id,
                a.fecha,
                c.montoEntregado,
                c.montoConInteres,
                c.cobroDiario,
                d.nombre cliente,
                sum(e.cobro) totalCobrado
            FROM prestamos a
            join rutasCobradores b on a.idRutaCobrador = b.id
            join MontoPrestamos c on c.id = a.idMonto
            join clientes d on d.id = a.idCliente
            join CobrosPrestamos e on e.idPrestamo = a.id
            WHERE b.idRuta = :id
            GROUP BY a.id
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
exports.default = RutasService;
//# sourceMappingURL=rutas.service.js.map