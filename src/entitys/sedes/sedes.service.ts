import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Sede } from './sede';

export default class SedesService {
    
    async getAll(): Promise<Sede[]>{
        let query = `
            select sede.id, sede.sede, deps.departamento 
            from Sede sede
            join Departamento deps on deps.id = sede.idDepartamento
        `
        try{
            const resp = await db.query<Sede>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }
}
