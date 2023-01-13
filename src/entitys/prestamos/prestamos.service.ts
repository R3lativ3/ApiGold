import { Response } from '../../app/general';
import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { PrestamoCreate, PrestamoDetail, Prestamo, PrestamoUpdate, PrestamoCompletado } from './prestamos';
import { CobroDetalle } from '../cobros/cobro.models';

export default class PrestamosService {

    async getAll(): Promise<Prestamo[]>{
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
        ` 
        try{
            const resp = await db.query<Prestamo>(query, { type: QueryTypes.SELECT })
            resp.forEach(x => x.cobroEnDias = this.avanceEnDias(x.fecha, new Date(), x.cuota, x.montoEntregado, x.pagado))
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    async getAllByIdRuta(id: number): Promise<Prestamo[]>{
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
        ` 
        try{
            const resp = await db.query<Prestamo>(query, { replacements: {id}, type: QueryTypes.SELECT })
            resp.forEach(x => x.cobroEnDias = this.avanceEnDias(x.fecha, new Date(), x.cuota, x.montoEntregado, x.pagado))
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    async get(id: number): Promise<PrestamoDetail | null> {
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
        ` 

        let body = `
            select id, cobro, fecha, lat, lon 
            from CobroPrestamo
            where idPrestamo = :id
            order by fecha desc
        ` 
                    
        try{
            const head = await db.query<Prestamo>(header, { replacements: { id }, type: QueryTypes.SELECT, plain: true})
            if(head === null)   
                return null
             
            head.cobroEnDias = this.avanceEnDias(head.fecha, new Date(), head.cuota, head.montoEntregado, head.pagado)
            const content = await db.query<CobroDetalle>(body, { replacements: { id }, type: QueryTypes.SELECT })
            return { prestamo: head, detalle: content }

        }catch(exception: any) {
            throw exception
        }
    }


    async getAllCompletadosPorCliente(idCliente: number, idCobrador: number){
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
        ` 
        try{
            const resp = await db.query<PrestamoCompletado>(query, { replacements: { idCliente, idCobrador }, type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    async create(body: PrestamoCreate): Promise<Response> {
        let query = `
            INSERT INTO ZXCcxx (fecha, idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto, activo, entregaEfectivo)
            VALUES (now(), :idRgasdfautaCobrador, :idUsuario, :idCliente, :idTipoPrestamo, :idMonto, 1, :entregaEfectivo)
        `
        try{
            const replacements = {
                idRutaCobrador: body.idRutaCobrador,
                idUsuario: body.idUsuario,
                idCliente: body.idCliente,
                idTipoPrestamo: body.idTipoPrestamo,
                idMonto: body.idMonto,
                entregaEfectivo: body.entregaEfectivo
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.INSERT })
            const [results, metadata] = resp
            return { success: true, message: `ID: ${results}, affected rows: ${metadata}`}
        }
        catch(exception: any){
            throw exception
        }
    }

    async update(body:PrestamoUpdate, id: number): Promise<Response> {
        let query = `
            UPDATE Prestamo 
            SET 
                idRutaCobrador = :idRutaCobrador, 
                idCliente = :idCliente, 
                idMonto = :idMonto, 
                entregaEfectivo = :entregaEfectivo
            WHERE id = :id
        `
        try{
            const replacements = {
                idRutaCobrador: body.idRutaCobrador,
                idCliente: body.idCliente,
                idMonto: body.idMonto,
                entregaEfectivo: body.entregaEfectivo,
                id
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.UPDATE })
            const [results, metadata] = resp
            return { success: true, message: `Update Prestamos ID: ${id}, Affected rows: ${metadata}` }
        }
        catch(exception){
            throw exception
        }
    }

    async delete(id: number): Promise<Response> {
        let query = `
            UPDATE Prestamo 
                SET eliminado = true
            WHERE id = :id
        `
        try{
            const resp = await db.query(query, { 
                replacements: { id },
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: `Affected rows: ${metadata}`}
        }
        catch(exception){
            throw exception
        }
    }

    public avanceEnDias(fechaInicio: Date, fechaFin: Date, montoDiario: number, montoEntregado: number, montoPagado: number){
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const utc1 = Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
        const utc2 = Date.UTC(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());
      
        let daysDiff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
        let diasPagados = montoPagado / montoDiario
        return diasPagados - daysDiff 
    } 
}
