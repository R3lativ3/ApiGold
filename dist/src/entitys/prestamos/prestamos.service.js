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
class PrestamosService {
    getAll() {
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
            from Prestamo a
            join RutaCobrador b on a.idRutaCobrador = b.id
            join Ruta r on b.idRuta = r.id
            join Cobrador co on b.idCobrador = co.id
            join Usuario c on a.idUsuario = c.id
            join TipoPrestamo d on a.idTipoPrestamo = d.id
            join MontoPrestamo e on a.idMonto = e.id
            join Cliente cli on cli.id = a.idCliente
            left join CobroPrestamo cp on a.id = cp.idPrestamo and cp.eliminado = false
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
    getAllByIdRuta(id) {
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
            from Prestamo a
            join RutaCobrador b on a.idRutaCobrador = b.id
            join Ruta r on b.idRuta = r.id
            join Cobrador co on b.idCobrador = co.id
            join Usuario c on a.idUsuario = c.id
            join TipoPrestamo d on a.idTipoPrestamo = d.id
            join MontoPrestamo e on a.idMonto = e.id
            join Cliente cli on cli.id = a.idCliente
            left join CobroPrestamo cp on a.id = cp.idPrestamo and cp.eliminado = false
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
    get(id) {
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
            from Prestamo a
            join RutaCobrador b on a.idRutaCobrador = b.id
            join Ruta r on b.idRuta = r.id
            join Cobrador co on b.idCobrador = co.id
            join Usuario c on a.idUsuario = c.id
            join TipoPrestamo d on a.idTipoPrestamo = d.id
            join MontoPrestamo e on a.idMonto = e.id
            join Cliente cli on cli.id = a.idCliente
            left join CobroPrestamo cp on a.id = cp.idPrestamo
            where a.id = :id
            group by a.fecha, a.activo, a.entregaEfectivo, r.nombreRuta, co.nombres, 
            c.nombreUsuario, d.tipoPrestamo, e.montoConInteres, e.porcentajeInteres, e.plazoDias, e.cobroDiario
        `;
            let body = `
            select id, cobro, fecha, lat, lon 
            from CobroPrestamo
            where idPrestamo = :id
            order by fecha desc
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
    getAllCompletadosPorCliente(idCliente, idCobrador) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select pre.id, 
                pre.fecha, 
                pre.entregaEfectivo,
                prex.fecha fechaFin, 
                prex.cobro ultimoCobro, 
                cli.id idCliente, 
                cli.nombre, 
                cli.direccion, 
                mon.cobroDiario, 
                mon.montoConInteres,
                mon.montoEntregado,
                mon.porcentajeInteres,
                mon.plazoDias
            from Prestamo pre
            join RutaCobrador rc on rc.id = pre.idRutaCobrador
            join Cobrador co on co.id = rc.idCobrador
            join Cliente cli on cli.id = pre.idCliente and cli.id = :idCliente
            join MontoPrestamo mon on mon.id = pre.idMonto
            join (
                select *
                from CobroPrestamo
                where id in (
                    select max(id) from CobroPrestamo group by idPrestamo 
                )
            ) prex on prex.idPrestamo = pre.id
            where co.id = :idCobrador
                and cli.id in (
                    select idCliente from Prestamo where activo = 0
                )		
            group by(pre.id);
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { idCliente, idCobrador }, type: sequelize_1.QueryTypes.SELECT });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            INSERT INTO ZXCcxx (fecha, idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto, activo, entregaEfectivo)
            VALUES (now(), :idRgasdfautaCobrador, :idUsuario, :idCliente, :idTipoPrestamo, :idMonto, 1, :entregaEfectivo)
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
    update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            UPDATE Prestamo 
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
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            UPDATE Prestamo 
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
    avanceEnDias(fechaInicio, fechaFin, montoDiario, montoEntregado, montoPagado) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
        const utc2 = Date.UTC(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());
        let daysDiff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
        let diasPagados = montoPagado / montoDiario;
        return diasPagados - daysDiff;
    }
}
exports.default = PrestamosService;
//# sourceMappingURL=prestamos.service.js.map