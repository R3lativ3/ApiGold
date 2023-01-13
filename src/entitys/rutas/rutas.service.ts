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
        let query = `INSERT INTO Ruta (nombreRuta, idSede, idMunicipio) VALUES (:nombreRuta, :idSede, :idMunicipio)`

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
        let query = `UPDATE Ruta set nombreRuta = :nombreRuta, idSede = :idSede, idMunicipio = :idMunicipio where id = :id`
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
            FROM Ruta a
            join Prestamo b on b.activo = 1
            join RutaCobrador c on c.idRuta = a.id and c.id = b.idRutaCobrador
            join MontoPrestamo d on d.id = b.idMonto
            join Sede e on e.id = a.idSede
            join Municipio f on f.id = a.idMunicipio
            join Cobrador g on g.id = c.idCobrador
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

    public async getAllByIdSede(id: number): Promise<Ruta[]|null>{
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
            FROM Ruta a
            join Prestamo b on b.activo = 1
            join RutaCobrador c on c.idRuta = a.id and c.id = b.idRutaCobrador
            join MontoPrestamo d on d.id = b.idMonto
            join Sede e on e.id = a.idSede
            join Municipio f on f.id = a.idMunicipio
            join Cobrador g on g.id = c.idCobrador
            WHERE a.idSede = :id
            GROUP BY a.id
        `
        try{
            const resp = await db.query<Ruta>(query, { replacements: {id}, type: QueryTypes.SELECT })
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
            FROM Prestamo a
            join RutaCobrador b on a.idRutaCobrador = b.id
            join MontoPrestamo c on c.id = a.idMonto
            join Cliente d on d.id = a.idCliente
            join CobroPrestamo e on e.idPrestamo = a.id
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

    public async ObtenerIdRutaPorIdCobrador(idCobrador :number): Promise<number | null>{
        try{
            let query = ` select idRuta from RutaCobrador where idCobrador = :idCobrador  `
            const resp = await db.query(query, { replacements: { idCobrador }, plain: true })
            return resp === null ? null : resp.idRuta as number
        }
        catch(exception){
            throw exception
        }
    }

}
