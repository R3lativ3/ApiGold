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
class PrestamosService {
    static isValidCreateRequest(body) {
        const [idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto] = body;
        if (idRutaCobrador && idUsuario && idCliente && idTipoPrestamo && idMonto)
            return true;
        return false;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select a.id, 
                a.fecha, 
                a.activo, 
                a.entregaEfectivo, 
                cli.nombre cliente, 
                r.nombreRuta ruta, 
                co.nombres cobrador, 
                c.nombreUsuario digitador, 
                d.tipoPrestamo tipo, 
                e.montoEntregado, 
                e.montoConInteres, 
                e.porcentajeInteres, 
                e.plazoDias, 
                e.cobroDiario cuota,
                sum(cp.cobro) pagado, 
                (sum(cp.cobro)/e.montoConInteres)*100 porcentaje
            from prestamos a
            join rutasCobradores b on a.idRutaCobrador = b.id
            join rutas r on b.idRuta = r.id
            join cobradores co on b.idCobrador = co.id
            join usuarios c on a.idUsuario = c.id
            join tiposPrestamos d on a.idTipoPrestamo = d.id
            join MontoPrestamos e on a.idMonto = e.id
            join clientes cli on cli.id = a.idCliente
            left join CobrosPrestamos cp on a.id = cp.idPrestamo and cp.eliminado = false
            where activo = 1 
            group by a.fecha, a.activo, a.entregaEfectivo, r.nombreRuta, co.nombres, 
            c.nombreUsuario, d.tipoPrestamo, e.montoConInteres, e.porcentajeInteres, e.plazoDias, e.cobroDiario
        `;
            try {
                const resp = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
                resp.forEach(x => x.cobroEnDias = this.avanceEnDias(x.fecha, new Date(), x.cuota, x.montoEntregado, x.pagado));
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    static getAllByIdRuta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select a.id, 
                a.fecha, 
                a.activo, 
                a.entregaEfectivo, 
                cli.nombre cliente, 
                r.nombreRuta ruta, 
                co.nombres cobrador, 
                c.nombreUsuario digitador, 
                d.tipoPrestamo tipo, 
                e.montoEntregado, 
                e.montoConInteres, 
                e.porcentajeInteres, 
                e.plazoDias, 
                e.cobroDiario cuota,
                sum(cp.cobro) pagado, 
                (sum(cp.cobro)/e.montoConInteres)*100 porcentaje
            from prestamos a
            join rutasCobradores b on a.idRutaCobrador = b.id
            join rutas r on b.idRuta = r.id
            join cobradores co on b.idCobrador = co.id
            join usuarios c on a.idUsuario = c.id
            join tiposPrestamos d on a.idTipoPrestamo = d.id
            join MontoPrestamos e on a.idMonto = e.id
            join clientes cli on cli.id = a.idCliente
            left join CobrosPrestamos cp on a.id = cp.idPrestamo and cp.eliminado = false
            where a.activo = 1 and r.id = :id
            group by a.fecha, a.activo, a.entregaEfectivo, r.nombreRuta, co.nombres, 
            c.nombreUsuario, d.tipoPrestamo, e.montoConInteres, e.porcentajeInteres, e.plazoDias, e.cobroDiario
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
                resp.forEach(x => x.cobroEnDias = this.avanceEnDias(x.fecha, new Date(), x.cuota, x.montoEntregado, x.pagado));
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let header = `
            select a.id,
                a.fecha, 
                a.activo, 
                a.entregaEfectivo, 
                cli.nombre cliente, 
                r.nombreRuta ruta, 
                co.nombres cobrador, 
                c.nombreUsuario digitador, 
                d.tipoPrestamo tipo, 
                e.montoEntregado, 
                e.montoConInteres, 
                e.porcentajeInteres, 
                e.plazoDias, 
                e.cobroDiario cuota,
                sum(cp.cobro) pagado, 
                (sum(cp.cobro)/e.montoConInteres)*100 porcentaje
            from prestamos a
            join rutasCobradores b on a.idRutaCobrador = b.id
            join rutas r on b.idRuta = r.id
            join cobradores co on b.idCobrador = co.id
            join usuarios c on a.idUsuario = c.id
            join tiposPrestamos d on a.idTipoPrestamo = d.id
            join MontoPrestamos e on a.idMonto = e.id
            join clientes cli on cli.id = a.idCliente
            left join CobrosPrestamos cp on a.id = cp.idPrestamo
            where a.id = :id
            group by a.fecha, a.activo, a.entregaEfectivo, r.nombreRuta, co.nombres, 
            c.nombreUsuario, d.tipoPrestamo, e.montoConInteres, e.porcentajeInteres, e.plazoDias, e.cobroDiario
        `;
            let body = `
            select id, cobro, fecha, lat, lon 
            from CobrosPrestamos 
            where idPrestamo = :id
        `;
            try {
                const head = yield connection_1.default.query(header, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT, plain: true });
                if (head === null)
                    return null;
                head.cobroEnDias = this.avanceEnDias(head.fecha, new Date(), head.cuota, head.montoEntregado, head.pagado);
                const content = yield connection_1.default.query(body, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
                return { prestamo: head, detalle: content };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            INSERT INTO prestamos (fecha, idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto, activo, entregaEfectivo)
            VALUES (now(), :idRutaCobrador, :idUsuario, :idCliente, :idTipoPrestamo, :idMonto, 1, :entregaEfectivo)
        `;
            try {
                const replacements = {
                    idRutaCobrador: body.idRutaCobrador,
                    idUsuario: body.idUsuario,
                    idCliente: body.idCliente,
                    idTipoPrestamo: body.idTipoPrestamo,
                    idMonto: body.idMonto,
                    entregaEfectivo: body.entregaEfectivo
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.INSERT });
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
            let query = `
            UPDATE prestamos 
            SET 
                idRutaCobrador = :idRutaCobrador, 
                idCliente = :idCliente, 
                idMonto = :idMonto, 
                entregaEfectivo = :entregaEfectivo
            WHERE id = :id
        `;
            try {
                const replacements = {
                    idRutaCobrador: body.idRutaCobrador,
                    idCliente: body.idCliente,
                    idMonto: body.idMonto,
                    entregaEfectivo: body.entregaEfectivo,
                    id
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.UPDATE });
                const [results, metadata] = resp;
                return { success: true, message: `Update Prestamos ID: ${id}, Affected rows: ${metadata}` };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            UPDATE prestamos 
                SET eliminado = true
            WHERE id = :id
        `;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: { id },
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
    static avanceEnDias(fechaInicio, fechaFin, montoDiario, montoEntregado, montoPagado) {
        let daysDiff = fechaFin.getDate() - fechaInicio.getDate();
        let diasPagados = montoPagado / montoDiario;
        return daysDiff - diasPagados;
    }
}
exports.default = PrestamosService;
//# sourceMappingURL=prestamos.service.js.map