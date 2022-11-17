import { Response } from '../../app/general';
import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { CreateRuta, Ruta } from './rutas';
import { PrestamoRuta } from '../prestamos/prestamos';

export default class RutasService {
    constructor(){}

    public isValidCreateRequest(body: any): boolean {
        const [nombreRuta, idSede, idMunicipio] = body
        if(nombreRuta && idSede && idMunicipio) return true
        return false
    }

    public async create(body: CreateRuta): Promise<Response> {
        let query = `INSERT INTO rutas (nombreRuta, idSede, idMunicipio) VALUES (:nombreRuta, :idSede, :idMunicipio)`

        try{
            const replacements = {
                nombreRuta: body.nombreRuta,
                idSede: body.idSede,
                idMunicipio: body.idMunicipio
            }

            const resp = await db.query(query, { replacements, type: QueryTypes.INSERT })
            const [results, metadata] = resp
            return { success: true, message: `Ruta creada: ${results}, filas afectadas: ${metadata}`}
        }
        catch(exception){
            throw exception
        }
    }

    public async update(body:CreateRuta, id: number): Promise<Response> {
        let query = `UPDATE rutas set nombreRuta = :nombreRuta, idSede = :idSede, idMunicipio = :idMunicipio where id = :id`
        try{
            const replacements = {
                nombreRuta: body.nombreRuta,
                idSede: body.idSede,
                idMunicipio: body.idMunicipio
            }

            const resp = await db.query(query, { replacements, type: QueryTypes.UPDATE })
            const [results, metadata] = resp
            return {success: true, message: `Ruta actualizada: ${metadata}, filas afectadas: ${results}`}
        }
        catch(exception){
            throw exception
        }
    }

    public async getAll(): Promise<Ruta[]>{
        let query = `
            SELECT  
                a.id, 
                a.nombreRuta, 
                e.sede, 
                f.municipio, 
                g.nombres, 
                g.apellidos, 
                count(b.idRutaCobrador) as cantidadClientes, 
                sum(d.montoEntregado) as capital, 
                sum(d.montoConInteres) as capitalGanancia, 
                sum(d.cobroDiario) as cobroDiario
            FROM rutas a
            join prestamos b on b.activo = 1
            join rutasCobradores c on c.idRuta = a.id and c.id = b.idRutaCobrador
            join MontoPrestamos d on d.id = b.idMonto
            join sedesGold e on e.id = a.idSede
            join municipios f on f.id = a.idMunicipio
            join cobradores g on g.id = c.idCobrador
            GROUP BY a.id
        `
        try{
            const resp = await db.query<Ruta>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    public async getAllByIdSede(id: number): Promise<Ruta|null>{
        let query = `
            SELECT  
                a.id, 
                a.nombreRuta, 
                e.sede, 
                f.municipio, 
                g.nombres, 
                g.apellidos, 
                count(b.idRutaCobrador) as cantidadClientes, 
                sum(d.montoEntregado) as capital, 
                sum(d.montoConInteres) as capitalGanancia, 
                sum(d.cobroDiario) as cobroDiario
            FROM rutas a
            join prestamos b on b.activo = 1
            join rutasCobradores c on c.idRuta = a.id and c.id = b.idRutaCobrador
            join MontoPrestamos d on d.id = b.idMonto
            join sedesGold e on e.id = a.idSede
            join municipios f on f.id = a.idMunicipio
            join cobradores g on g.id = c.idCobrador
            WHERE a.idSede = :id
            GROUP BY a.id
        `
        try{
            const resp = await db.query<Ruta>(query, { replacements: {id}, type: QueryTypes.SELECT, plain: true })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    public async ObtenerPrestamosPorRuta(id:number): Promise<PrestamoRuta[]>{
        let query = `
            SELECT a.id,
                a.fecha,
                c.montoEntregado,
                c.montoConInteres,
                c.cobroDiario,
                d.nombre cliente,
                sum(e.cobro) totalCobrado
            FROM prestamos a
            join rutasCobradores b on a.idRutaCobrador = b.id
            join MontoPrestamos c on c.id = a.idMonto
            join clientes d on d.id = a.idCliente
            join CobrosPrestamos e on e.idPrestamo = a.id
            WHERE b.idRuta = :id
            GROUP BY a.id
        `

        try{
            const resp = await db.query<PrestamoRuta>(query, { replacements: { id }, type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

}
