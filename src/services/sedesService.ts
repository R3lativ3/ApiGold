import { propertyModel, generalResponse, updateModel, QueryResponse } from '../models/general.models';
import db from "../db/connection"
import { QueryTypes } from 'sequelize'

export default class Sedes {
    public static async getAll(): Promise<QueryResponse>{
        let query = `
            select sede.id, sede.sede, deps.departamento 
            from sedesGold sede
            join departamentos deps on deps.id = sede.idDepartamento
        `
        try{
            const resp = await db.query(query, { type: QueryTypes.SELECT })
            return { success: true, response : resp }
        }
        catch(exception){
            return { success: false, response: exception}
        }
    }
}
