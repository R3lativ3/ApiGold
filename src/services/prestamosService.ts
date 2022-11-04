import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'
import { prestamoCreate, prestamos } from '../models/prestamos.models';

class PrestamosService {

    public static isValidCreateRequest(body: any): boolean {
        const [idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto] = body
        if(idRutaCobrador && idUsuario && idCliente && idTipoPrestamo && idMonto) return true
        return false
    }

    public static async getAll(): Promise<QueryResponse>{
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
        ` 
        try{
            const resp = await db.query<prestamos>(query, { type: QueryTypes.SELECT })
            console.log(resp)
            resp.forEach(x => x.cobroEnDias = this.avanceEnDias(x.fecha, new Date(), x.cuota, x.montoEntregado, x.pagado))
            return { success: true, response : resp }
        }
        catch(exception){
            throw exception
        }
    }

    public static async getAllByIdRuta(id: number): Promise<QueryResponse>{
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
        ` 
        try{
            const resp = await db.query<prestamos>(query, { replacements: {id}, type: QueryTypes.SELECT })
            console.log(resp)
            resp.forEach(x => x.cobroEnDias = this.avanceEnDias(x.fecha, new Date(), x.cuota, x.montoEntregado, x.pagado))
            return { success: true, response : resp }
        }
        catch(exception){
            throw exception
        }
    }

    public static async get(id: number): Promise<QueryResponse> {
        let header = `
            select a.fecha, 
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
            where a.id = :ida
            group by a.fecha, a.activo, a.entregaEfectivo, r.nombreRuta, co.nombres, 
            c.nombreUsuario, d.tipoPrestamo, e.montoConInteres, e.porcentajeInteres, e.plazoDias, e.cobroDiario
        ` 

        let body = `
            select id, cobro, fecha, lat, lon 
            from CobrosPrestamos 
            where idPrestamo = :id
        ` 
                    
        try{
            const head = await db.query(header, { replacements: { id }, type: QueryTypes.SELECT })
            const content = await db.query(body, { replacements: { id }, type: QueryTypes.SELECT })
            return { 
                success: true, 
                response : {
                    prestamo: head,
                    cobros: content
                }
            }
        }catch(exception: any) {
            throw exception
        }
    }

    public static async create(body: prestamoCreate): Promise<generalResponse> {
        let query = `
            INSERT INTO prestamos (fecha, idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto, activo, entregaEfectivo)
            VALUES (now(), :idRutaCobrador, :idUsuario, :idCliente, :idTipoPrestamo, :idMonto, 1, :entregaEfectivo)
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

    public static async update(body:any, id: number): Promise<generalResponse> {
        let query = `
            UPDATE prestamos SET 
            idRutaCobrador = :idRutaCobrador, 
            idCliente = :idCliente, 
            idMonto = :idMonto, 
            entregaEfectivo = :entregaEfectivo
            WHERE id = :id
        `
        try{
            const [ idRutaCobrador, idCliente, idMonto, entregaEfectivo ] = body
            const resp = await db.query(query, { 
                replacements: { idRutaCobrador, idCliente, idMonto, entregaEfectivo, id },
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: `Affected rows: ${metadata}`}
        }
        catch(exception){
            throw exception
        }
    }

    public static async delete(id: number): Promise<generalResponse> {
        let query = `
            UPDATE prestamos 
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

    public static avanceEnDias(fechaInicio: Date, fechaFin: Date, montoDiario: number, montoEntregado: number, montoPagado: number){
        let daysDiff = fechaFin.getDate() - fechaInicio.getDate()
        let diasPagados = montoPagado / montoDiario
        return daysDiff - diasPagados
    } 
}

export default PrestamosService