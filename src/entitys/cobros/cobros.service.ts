import { Response } from '../../app/general';
import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Cobro, CobroPost, CobroUpdate } from './cobro';

class CobrosService {
    public static async create(cobro: CobroPost): Promise<Response> {
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

            return { success: true, message: `Cobro Regitrado: ${results}, filas afectadas: ${metadata}`}
        }
        catch(exception: any){
            throw exception
        }
    }

    public static async update(cobro: CobroUpdate, id: number): Promise<Response> {
        let query = `UPDATE CobrosPrestamos set cobro = :cobro where id = :id`
        try{
            const resp = await db.query(query, { 
                replacements: {cobro: cobro.cobro, id},
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: `Cobro Actualizado, id: ${id}. Filas afectadas ${metadata}`}
        }
        catch(exception: any){
            throw exception
        }
    }

    public static async getAll(): Promise<Cobro[]>{
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
            const resp = await db.query<Cobro>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    public static async get(idPrestamo: number): Promise<Cobro> {
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
            const resp = await db.query<Cobro>(query, { replacements: { idPrestamo }, type: QueryTypes.SELECT })
            return resp[0];
        }catch(exception) {
            throw exception;
        }
    }

}

export default CobrosService