import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

class Cobradores {

    public static isValidCreateRequest(body: any): boolean {
        if(body.nombres && body.apellidos && body.dpi && body.telefono && body.idUsuario) return true
        return false
    }

    public static async create(body: any): Promise<generalResponse> {
        let query = `
            INSERT INTO cobradores (nombre, dpi, telefono, idUsuario) 
            VALUES (:nombres, :dpi, :telefono, :idUsuario)
        ` 
        try{

            const resp = await db.query(query, { 
                replacements: { 
                    nombres: body.nombres,
                    apellidos: body.apellidos,
                    dpi: body.dpi,
                    telefono: body.telefono,
                    idUsuario: body.idUsuario 
                },
                type: QueryTypes.INSERT 
            })
            const [results, metadata] = resp

            return { success: true, message: "ID: "+ results+" affected rows: "+metadata }
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    public static async update(body:any, id: number): Promise<generalResponse> {
        let query = `
            UPDATE cobradores 
            SET nombre = :nombre, dpi = :dpi,  telefono = :telefono, idUsuario = :idUsuario
            WHERE id = :id
        `
        const replacements = {
            nombre: body.nombre,
            dpi: body.dpi,
            telefono: body.telefono,
            idUsuario: body.idUsuario
        }
        try{
            const resp = await db.query(query, { 
                replacements,
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: "Affected rows: "+metadata}
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    public static async getAll(): Promise<QueryResponse>{
        let query = `
            SELECT a.id, a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede
            FROM cobradores a 
            LEFT JOIN rutasCobradores b on a.id = b.idCobrador 
            LEFT JOIN rutas c on c.id = b.idRuta 
            LEFT JOIN sedesGold d on d.id = c.idSede  
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
            SELECT a.nombres, a.apellidos, a.dpi, a.telefono, c.nombreRuta, d.sede 
            FROM cobradores a, rutasCobradores b, rutas c, sedesGold d 
            WHERE b.idCobrador = a.id and c.id = b.idRuta and d.id = c.idSede and a.id = :id 
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
            SELECT a.fecha as fechaEntrega, c.nombres, c.apellidos, d.montoEntregado, d.plazoDias, d.montoConInteres
            FROM prestamos a, rutasCobradores b, clientes c, MontoPrestamos d
            WHERE a.idRutaCobrador = b.id and a.idCliente = c.id and a.idMonto = d.id and b.idCobrador = :id
        `
        try{
            const resp = await db.query(query, { replacements: { id }, type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }catch(exception: any) {
            return { success: false, response: exception}
        }
    }

}

export default Cobradores