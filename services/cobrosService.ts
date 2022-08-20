import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'
import { cobro, cobroPost, cobroUpdate } from '../models/cobro';

class CobrosService {

    public static isValidCreateRequest(body: any): boolean {
        if(body.idPrestamo && body.cobro) return true
        return false
    }

    public static async create(cobro: cobroPost): Promise<generalResponse> {
        let query = `
            INSERT INTO CobrosPrestamos (cobro, idPrestamo, lat, lon, fecha)
            VALUES (:cobro, :idPrestamo, :lat, :lon, now())
        `
        try{
            const resp = await db.query(query, { 
                replacements: { 
                    cobro: cobro.cobro,
                    idPrestamo: cobro.idPrestamo,
                    lat: cobro.lat,
                    lon: cobro.lon
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

    public static async update(cobro: cobroUpdate, id: number): Promise<generalResponse> {
        let query = `UPDATE CobrosPrestamos set cobro = :cobro where id = :id`
        try{
            const resp = await db.query(query, { 
                replacements: {cobro: cobro.cobro, id},
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: `Affected rows: ${metadata}`}
        }
        catch(exception: any){
            throw exception
        }
    }

    public static async getAll(): Promise<cobro[]>{
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
            const resp = await db.query<cobro>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    public static async get(idPrestamo: number): Promise<cobro> {
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
            from CobrosPrestamos a
            join prestamos b on b.id = a.idPrestamo
            join clientes cli on cli.id = b.idCliente
            join rutasCobradores ruc on b.idRutaCobrador = ruc.id
            join rutas rut on ruc.idRuta = rut.id
            where a.idPrestamo = :idPrestamo
        `
        try{
            const resp = await db.query<cobro>(query, { replacements: { idPrestamo }, type: QueryTypes.SELECT })
            return resp[0];
        }catch(exception) {
            throw exception;
        }
    }

}

export default CobrosService