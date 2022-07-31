import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

class Prestamos {

    public static isValidCreateRequest(body: any): boolean {
        const [idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto] = body
        if(idRutaCobrador && idUsuario && idCliente && idTipoPrestamo && idMonto) return true
        return false
    }

    public static async create(body: any): Promise<generalResponse> {
        let query = `INSERT INTO prestamos (fecha, idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto)
                    VALUES (now(), :idRutaCobrador, :idUsuario, :idCliente, :idTipoPrestamo, :idMonto)`

        try{
            const [idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto] = body
            const resp = await db.query(query, { 
                replacements: { idRutaCobrador, idUsuario, idCliente, idTipoPrestamo, idMonto },
                type: QueryTypes.INSERT 
            })
            const [results, metadata] = resp
            return { success: true, message: `ID: ${results}, affected rows: ${metadata}`}
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    public static async update(body:any, id: number): Promise<generalResponse> {
        let query = `UPDATE prestamos set idMonto = :idMonto where id = :id`
        try{
            const resp = await db.query(query, { 
                replacements: {cobro: body.idMonto, id},
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: `Affected rows: ${metadata}`}
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    public static async getAll(): Promise<QueryResponse>{
        let query = 'select a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede '
                    +'from cobradores a '
                    +'left join rutasCobradores b '
                    +'   on a.id = b.idCobrador '
                    +'left join rutas c '
                    +'   on c.id = b.idRuta '
                    +'left join sedesGold d '
                    +'   on d.id = c.idSede '    

        try{
            const resp = await db.query(query, { type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }
        catch(exception){
            return { success: false, response: exception}
        }
    }

    public static async get(id: number): Promise<QueryResponse> {
        let query = 'select a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede '
                    +'from cobradores a, rutasCobradores b, rutas c, sedesGold d '
                    +'where b.idCobrador = a.id and c.id = b.idRuta and d.id = c.idSede and a.id = :id '
        try{
            const resp = await db.query(query, { replacements: { id }, type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }catch(exception: any) {
            return { success: false, response: exception}
        }
    }

    public static async getClientes(id: number): Promise<QueryResponse> {
        let query = `
            select a.fecha as fechaEntrega, c.nombres, c.apellidos, d.montoEntregado, d.plazoDias, d.montoConInteres
            from prestamos a, rutasCobradores b, clientes c, MontoPrestamos d
            where a.idRutaCobrador = b.id and a.idCliente = c.id and a.idMonto = d.id and b.idCobrador = :id
        `
        try{
            const resp = await db.query(query, { replacements: { id }, type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }catch(exception: any) {
            return { success: false, response: exception}
        }
    }

}

export default Prestamos