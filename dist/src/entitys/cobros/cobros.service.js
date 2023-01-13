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
const prestamos_service_1 = __importDefault(require("../prestamos/prestamos.service"));
const tsyringe_1 = require("tsyringe");
class CobrosService {
    create(cobro) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'CALL AgregarCobro(:idPrestamo, :cobro, :lat, :lon, now())';
            try {
                const replacements = {
                    cobro: cobro.cobro,
                    idPrestamo: cobro.idPrestamo,
                    lat: cobro.lat,
                    lon: cobro.lon
                };
                const resp = yield connection_1.default.query(query, {
                    replacements,
                    type: sequelize_1.QueryTypes.SELECT,
                    plain: true,
                    mapToModel: true
                });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    update(cobro, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `UPDATE CobroPrestamo set cobro = :cobro where id = :id`;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: { cobro: cobro.cobro, id },
                    type: sequelize_1.QueryTypes.UPDATE
                });
                const [results, metadata] = resp;
                return { success: true, message: `Cobro Actualizado, id: ${id}. Filas afectadas ${metadata}` };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    getAll() {
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
            from CobroPrestamo a
            join Prestamo b on b.id = a.idPrestamo
            join Cliente cli on cli.id = b.idCliente
            join RutaCobrador ruc on b.idRutaCobrador = ruc.id
            join Ruta rut on ruc.idRuta = rut.id
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
    getAllByDate(date = new Date()) {
        return __awaiter(this, void 0, void 0, function* () {
            // variable: date se reemplaza en el query siguiente por :date
            let query = `
            select cobro.id, 
                cobro.idPrestamo, 
                cobro.cobro, 
                cobro.lat, 
                cobro.lon, 
                cobro.fecha, 
                cobro.cliente, 
                cobro.montoConInteres, 
                cobro.plazoDias, 
                cobro.cobroDiario, 
                total.total
            from(
                select cob.id, cob.idPrestamo, cob.cobro, cob.lat, cob.lon, cob.fecha, cli.nombre cliente, mon.montoConInteres, mon.plazoDias, mon.cobroDiario
                from CobroPrestamo cob
                join Prestamo pre on cob.idPrestamo = pre.id
                join RutaCobrador rut on rut.id = pre.idRutaCobrador and rut.id = 2
                join Cliente cli on pre.idCliente = cli.id
                join MontoPrestamo mon on pre.idMonto = mon.id
                where date(cob.fecha) = :date
            ) cobro
            left join (
                select idPrestamo, sum(cobro) total 
                from CobroPrestamo 
                where fecha < :date
                group by idPrestamo
            ) total on cobro.idPrestamo = total.idPrestamo
            order by fecha desc
        `;
            try {
                const resp = yield connection_1.default.query(query, { replacements: { date }, type: sequelize_1.QueryTypes.SELECT });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    get(id) {
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
            from CobroPrestamo a
            join Prestamo b on b.id = a.idPrestamo
            join Cliente cli on cli.id = b.idCliente
            join RutaCobrador ruc on b.idRutaCobrador = ruc.id
            join Ruta rut on ruc.idRuta = rut.id
            where a.id = :id
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
    getCurrentMonday() {
        const today = new Date();
        const first = today.getDate() - today.getDay() + 1;
        const monday = new Date(today.setDate(first));
        return monday;
    }
    getTotalByDates(idRuta, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select sum(cob.cobro) total, date(cob.fecha) fecha
            from CobroPrestamo cob
            join Prestamo pre on cob.idPrestamo = pre.id
            join RutaCobrador rut on rut.id = pre.idRutaCobrador and rut.id = :idRuta
            where cob.eliminado = 0 and date(cob.fecha) between  date(:fechaInicio) and date(:fechaFin)
            group by date(cob.fecha)
        `;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: {
                        fechaInicio: start,
                        fechaFin: end,
                        idRuta
                    },
                    type: sequelize_1.QueryTypes.SELECT
                });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    getDisponiblesPorIdCobrador(idCobrador) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select pre.id idPrestamo, cob.id idCobro, pre.fecha fechaPrestamo, cob.fecha, cli.nombre, cli.direccion, mon.cobroDiario, mon.montoConInteres, cob.cobro,
            total.total
            from Prestamo pre
            join RutaCobrador rc on rc.id = pre.idRutaCobrador
            join Cobrador co on co.id = rc.idCobrador
            join Cliente cli on cli.id = pre.idCliente
            join MontoPrestamo mon on mon.id = pre.idMonto
            left join CobroPrestamo cob on cob.idPrestamo = pre.id and date(cob.fecha) = date(now())
            left join (
                select idPrestamo, sum(cobro) total 
                from CobroPrestamo 
                group by idPrestamo
            ) total on pre.id = total.idPrestamo
            where co.id = :idCobrador and (total.total < mon.montoConInteres or total.total is null)
        `;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: { idCobrador },
                    type: sequelize_1.QueryTypes.SELECT
                });
                const prestamoService = tsyringe_1.container.resolve(prestamos_service_1.default);
                resp.forEach(x => x.avanceEnDias = prestamoService.avanceEnDias(x.fechaPrestamo, new Date(), x.cobroDiario, x.montoConInteres, x.total));
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    getDisponiblesPorIdCobradorBusqueda(idCobrador, busqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select pre.id idPrestamo, cob.id idCobro, pre.fecha fechaPrestamo, cob.fecha, cli.nombre, cli.direccion, mon.cobroDiario, mon.montoConInteres, cob.cobro,
            total.total
            from Prestamo pre
            join RutaCobrador rc on rc.id = pre.idRutaCobrador
            join Cobrador co on co.id = rc.idCobrador
            join Cliente cli on cli.id = pre.idCliente
            join MontoPrestamo mon on mon.id = pre.idMonto
            left join CobroPrestamo cob on cob.idPrestamo = pre.id and date(cob.fecha) = date(now())
            left join (
                select idPrestamo, sum(cobro) total 
                from CobroPrestamo 
                group by idPrestamo
            ) total on pre.id = total.idPrestamo
            where co.id = :idCobrador and (total.total < mon.montoConInteres or total.total is null) and cli.nombre like :nombre
        `;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: { idCobrador, nombre: `%${busqueda}%` },
                    type: sequelize_1.QueryTypes.SELECT
                });
                const prestamoService = tsyringe_1.container.resolve(prestamos_service_1.default);
                resp.forEach(x => x.avanceEnDias = prestamoService.avanceEnDias(x.fechaPrestamo, new Date(), x.cobroDiario, x.montoConInteres, x.total));
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    getTotalPorSemana(idCobrador) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryMontoTotal = `
            select sum(a.cobro) totalCobro, sum(mon.montoConInteres) totalPrestamo, date(a.fecha) fecha
            from CobroPrestamo a
            join Prestamo b on a.idPrestamo = b.id
            join RutaCobrador c on c.id = b.idRutaCobrador and c.idCobrador = :idCobrador
            left join MontoPrestamo mon on b.idMonto = mon.id and yearweek(b.fecha) = yearweek(now())
            where yearweek(a.fecha) = yearweek(now()) and a.eliminado = false
            group by yearweek(a.fecha)
        `;
            let queryDetalleMontoTotal = `
            select sum(a.cobro) totalCobro, sum(mon.montoConInteres) totalPrestamo, date(a.fecha) fecha
            from CobroPrestamo a
            join Prestamo b on a.idPrestamo = b.id
            join RutaCobrador c on c.id = b.idRutaCobrador and c.idCobrador = :idCobrador
            left join MontoPrestamo mon on b.idMonto = mon.id and yearweek(b.fecha) = yearweek(now())
            where yearweek(a.fecha) = yearweek(now()) and a.eliminado = false
            group by date(a.fecha)
            order by a.fecha desc
        `;
            try {
                const total = yield connection_1.default.query(queryMontoTotal, {
                    replacements: { idCobrador },
                    type: sequelize_1.QueryTypes.SELECT,
                    plain: true
                });
                const detalle = yield connection_1.default.query(queryDetalleMontoTotal, {
                    replacements: { idCobrador },
                    type: sequelize_1.QueryTypes.SELECT
                });
                return { total, detalle };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
}
exports.default = CobrosService;
//# sourceMappingURL=cobros.service.js.map