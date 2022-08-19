import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

class CobrosService {

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
            throw exception
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
            throw exception
        }
    }

    public static async getAll(): Promise<QueryResponse>{
        let query =  `
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
        `
        try{
            const resp = await db.query(query, { type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }
        catch(exception){
            return { success: false, response: exception}
        }
    }

    public static async get(idPrestamo: number): Promise<QueryResponse> {
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
        `
        try{
            const resp = await db.query(query, { replacements: { idPrestamo }, type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }catch(exception: any) {
            return { success: false, response: exception}
        }
    }

}

export default CobrosService