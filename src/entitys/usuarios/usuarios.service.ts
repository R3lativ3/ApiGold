import { Response } from '../../app/general';
import { CreateUsuario, Usuario } from "./usuarios"
import db from "../../db/connection"
import { QueryTypes } from 'sequelize';

export default class UsuariosService{

    public async create(body: CreateUsuario){
        let query = `
            INSERT INTO usuarios (nombreUsuario, emailUsuario, psw, salt, idTipoUsuario)
            values (:nombreUsuario, :emailUsuario, :psw, :salt, :idTipoUsuario)
        `

        try{
            const replacements = {
                nombreUsuario: body.nombre, 
                emailUsuario: body.email,
                psw: body.psw,
                salt: body.salt,
                idTipoUsuario: body.idTipoUsuario
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.INSERT })
            const [results, metadata] = resp
            return { success: true, message: `Usuario creado: ${results}, filas afectadas: ${metadata}`}
        }
        catch(exception){
            throw exception
        }
    }

    public async update(body:CreateUsuario, id: number){
        let query = `
        UPDATE usuarios 
        set 
            nombreUsuario = :nombreUsuario, 
            emailUsuario = :emailUsuario, 
            psw = :psw,
            salt = :salt,
            IdTipoUsuario = :IdTipoUsuario
        where id = :id`
        try{
            const replacements = {
                nombreUsuario: body.nombre, 
                emailUsuario: body.email,
                psw: body.psw,
                salt: body.salt,
                idTipoUsuario: body.idTipoUsuario,
                id
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.UPDATE })
            const [results, metadata] = resp
            return {success: true, message: `Usuario actualizado: ${metadata}, filas afectadas: ${results}`}
        }
        catch(exception){
            throw exception
        }
    }

    public async getAll(){
        let query = `
            SELECT  
                a.id,
                a.nombreUsuario,
                a.emailUsuario,
                b.tipoUsuario
            FROM usuarios a
            join tiposUsuarios b
                on b.id = a.IdTipoUsuario
        `
        try{
            const resp = await db.query<Usuario>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    public async get(id: number){
        let query = `
            SELECT  
                a.id,
                a.nombreUsuario,
                a.emailUsuario,
                b.tipoUsuario
            FROM usuarios a
            join tiposUsuarios b
                on b.id = a.IdTipoUsuario
            where a.id = :id
        `
        try{
            const resp = await db.query<Usuario>(query, {
                replacements: { id }, 
                type: QueryTypes.SELECT, 
                raw: true 
            })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

}