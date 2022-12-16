import { propertyModel, Response, updateModel, QueryResponse } from '../../app/general';
import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Cobrador, CreateCobrador, TotalesPrestamoCobroPorSemana } from './cobrador.models';
import { PrestamoPorCobrador } from '../prestamos/prestamos';

export default class CobradoresService {

    async create(body: CreateCobrador){
        let query = `
            INSERT INTO cobradores (nombres, apellidos, dpi, telefono, idUsuario) 
            VALUES (:nombres, apellidos, :dpi, :telefono, :idUsuario)
        ` 
        try{
            const replacements = {
                nombre: body.nombres,
                apellidos: body.apellidos,
                dpi: body.dpi,
                telefono: body.telefono,
                idUsuario: body.idUsuario
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.INSERT })
            const [results, metadata] = resp

            return { success: true, message: "Cobrador creado: "+ results+" filas afectadas: "+metadata }
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    async update(body: CreateCobrador, id: number){
        let query = `
            UPDATE cobradores 
            SET 
                nombres = :nombre, 
                apellidos = :apellidos, 
                dpi = :dpi, 
                telefono = :telefono, 
                idUsuario = :idUsuario
            WHERE id = :id
        `
        const replacements = {
            nombre: body.nombres,
            apellidos: body.apellidos,
            dpi: body.dpi,
            telefono: body.telefono,
            idUsuario: body.idUsuario,
            id
        }
        try{
            const resp = await db.query(query, { replacements, type: QueryTypes.UPDATE })
            const [results, metadata] = resp
            return {success: true, message: "Cobrador actualizado, "+results+" filas afectadas: "+metadata}
        }
        catch(exception: any){
            return { success: false, message: exception }
        }
    }

    async getAll(){
        let query = `
            SELECT a.id, 
                a.nombres, 
                a.apellidos, 
                a.dpi, 
                a.telefono, 
                c.nombreRuta, 
                d.sede
            FROM cobradores a 
            LEFT JOIN rutasCobradores b on a.id = b.idCobrador 
            LEFT JOIN rutas c on c.id = b.idRuta 
            LEFT JOIN sedesGold d on d.id = c.idSede  
        ` 
        try{
            const resp = await db.query<Cobrador>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

     async get(id: number): Promise<Cobrador|null> {
        let query = `
            SELECT a.id,
                a.nombres, 
                a.apellidos, 
                a.dpi, 
                a.telefono, 
                c.nombreRuta, 
                d.sede 
            FROM cobradores a
            join rutasCobradores b on b.idCobrador = a.id
            join rutas c on c.id = b.idRuta
            join sedesGold d on d.id = c.idSede
            WHERE a.id = :id 
        ` 
        try{
            const resp = await db.query<Cobrador>(query, { replacements: { id }, type: QueryTypes.SELECT, plain: true})
            return resp
        }catch(exception) {
            throw exception
        }
    }

    async getPrestamosByCobradorId(id: number){
        let query = `
            SELECT a.id,
                a.fecha as fechaEntrega, 
                c.nombre, 
                d.montoEntregado, 
                d.plazoDias, 
                d.montoConInteres
            FROM prestamos a 
            join rutasCobradores b on a.idRutaCobrador = b.id and b.idCobrador = :id
            join clientes c on c.id = a.idCliente
            join MontoPrestamos d on d.id = a.idMonto
        `
        try{
            const resp = await db.query<PrestamoPorCobrador>(query, { replacements: { id }, type: QueryTypes.SELECT })
            return resp
        }catch(exception) {
            throw exception
        }
    }

    public async getTotalesSemanaPorCobradorId(idCobrador: number){
        let query = `
            select sum(a.cobro) totalCobro, sum(mon.montoConInteres) totalPrestamo, date(a.fecha) fecha
            from CobroPrestamo a
            join Prestamo b on a.idPrestamo = b.id
            join RutaCobrador c on c.id = b.idRutaCobrador and c.idCobrador = 1
            left join MontoPrestamo mon on b.idMonto = mon.id and yearweek(b.fecha) = yearweek(now())
            where yearweek(a.fecha) = yearweek(now()) and a.eliminado = false
            group by date(a.fecha)
        `
        try{
            const resp = await db.query<TotalesPrestamoCobroPorSemana>(query, { 
                replacements: { idCobrador }, 
                type: QueryTypes.SELECT
            })
            return resp;
        }catch(exception) {
            throw exception;
        }
    }

}
