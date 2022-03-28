import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

class Prestamos {

    public static isValidCreateRequest(body: any): boolean {
        const [nombreRuta, idSede, idMunicipio] = body
        if(nombreRuta && idSede && idMunicipio) return true
        return false
    }

    public static async create(body: any): Promise<generalResponse> {
        let query = `INSERT INTO rutas (nombreRuta, idSede, idMunicipio) VALUES (:nombreRuta, :idSede, :idMunicipio)`

        try{
            const [nombreRuta, idSede, idMunicipio] = body

            const resp = await db.query(query, { 
                replacements: { nombreRuta, idSede, idMunicipio },
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
        let query = `UPDATE rutas set nombreRuta = :nombreRuta, idSede = :idSede, idMunicipio = :idMunicipio where id = :id`
        try{
            const [nombreRuta, idSede, idMunicipio] = body

            const resp = await db.query(query, { 
                replacements: { nombreRuta, idSede, idMunicipio },
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
        let query = `
            SELECT  a.id, 
                    a.nombreRuta, 
                    e.sede, 
                    f.municipio, 
                    g.nombres, 
                    g.apellidos, 
                    count(b.idRutaCobrador) as cantidadClientes, 
                    sum(d.montoEntregado) as capital, 
                    sum(d.montoConInteres) as capitalGanancia, 
                    sum(d.cobroDiario) as cobroDiario
            FROM rutas a, prestamos b, rutasCobradores c, MontoPrestamos d, sedesGold e, municipios f, cobradores g
            WHERE a.id = c.idRuta and b.idRutaCobrador = c.id and b.activo = 1 and b.idMonto = d.id and e.id = a.idSede and f.id = a.idMunicipio and g.id = c.idCobrador
            GROUP BY a.id`

        try{
            const resp = await db.query(query, { type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }
        catch(exception){
            return { success: false, response: exception}
        }
    }

}

export default Prestamos