import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

class Cobradores {

    public static isValidCreateRequest(body: any): boolean {
        if(body.nombres && body.apellidos && body.dpi && body.telefono && body.idUsuario) return true
        return false
    }

    public static async create(body: any): Promise<generalResponse> {
        let query = 'insert into cobradores (nombres, apellidos, dpi, telefono, idUsuario) '
        +'values (:nombres, :apellidos, :dpi, :telefono, :idUsuario)'

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
        const objectUpdate = this.getUpdateString(body, id)
        const replacements = objectUpdate.obj
        try{
            const resp = await db.query(objectUpdate.query, { 
                replacements: replacements,
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: "Affected rows: "+metadata}
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    static getUpdateString (body: any, id: number) : updateModel  {
        let resp = 'update cobradores set'
        let obj : propertyModel = {}
        if (body.nombres){
            resp += ' nombres = :nombres,'
            obj.nombres = body.nombres
        }
        if (body.apellidos){
            resp += ' apellidos = :apellidos,'
            obj.apellidos = body.apellidos
        } 
        if (body.dpi){
            resp += ' dpi = :dpi,'
            obj.dpi = body.dpi
        } 
        if (body.telefono){
            resp += ' telefono = :telefono,'
            obj.telefono = body.telefono
        } 
        if (body.idUsuario){
            resp += ' idUsuario = :idUsuario'
            obj.idUsuario = body.idUsuario
        } 

        if (resp.charAt(resp.length - 1) === ',') resp = resp.slice(0, -1)
    
        resp += ' WHERE id = :id '
        obj.id = id
    
        let response: updateModel = { query : resp, obj }
        
        return response
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

export default Cobradores