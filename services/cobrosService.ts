import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

class Prestamos {

    public static isValidCreateRequest(body: any): boolean {
        if(body.idPrestamo && body.cobro) return true
        return false
    }

    public static async create(body: any): Promise<generalResponse> {
        let query = `
            INSERT INTO CobrosPrestamos (cobro, idPrestamo, lat, lon, fecha)
            VALUES (:cobro, :idPrestamo, :lat, :lon, getdate())
        `

        try{
            const resp = await db.query(query, { 
                replacements: { 
                    cobro: body.cobro,
                    idPrestamo: body.idPrestamo,
                    lat: body.lat,
                    lon: body.lon
                },
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
        let query = `UPDATE CobrosPrestamos set cobro = :cobro where id = :id`
        try{
            const resp = await db.query(query, { 
                replacements: {cobro: body.cobro, id},
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
        let query =  `
            select a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede 
            from cobradores a 
            left join rutasCobradores b on a.id = b.idCobrador 
            left join rutas c on c.id = b.idRuta 
            left join sedesGold d on d.id = c.idSede   
        `
        try{
            const resp = await db.query(query, { type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }
        catch(exception){
            return { success: false, response: exception}
        }
    }

    public static async get(id: number): Promise<QueryResponse> {
        let query = `
            select a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede 
            from cobradores a, rutasCobradores b, rutas c, sedesGold d 
            where b.idCobrador = a.id and c.id = b.idRuta and d.id = c.idSede and a.id = :id 
        `
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