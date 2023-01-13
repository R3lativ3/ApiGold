import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Cliente, CreateCliente, PrestamoCliente } from "./cliente.models"
import { Response } from "../../app/general"
import { Express, response } from "express"
import Resize from "../../helpers/Resize"
import path from 'path'
import multer from "multer"

export default class ClientesService {

    async getAll(){
        let query = `
            select id, 
                nombre,
                dpi,
                telefono,
                telefono2,
                ocupacion,
                negocio,
                foto,
                fotoCasa,
                direccion,
                nit,
                referencia,
                createdAt
            from Cliente
        `
        const resx = await db.query<Cliente>(query, { type: QueryTypes.SELECT })
        return resx
    }
    
    async get(id: number){
        let query = `
            select id, 
                nombre,
                dpi,
                telefono,
                telefono2,
                ocupacion,
                negocio,
                foto,
                fotoCasa,
                direccion,
                nit,
                referencia,
                createdAt
            from Cliente
            where id = :id
        `
        const resp = await db.query<Cliente>(query, { replacements: { id }, type: QueryTypes.SELECT, plain: true })
        return resp
    }
    
    async getPrestamosByCliente (id: number){
        let query = `
            select 
            b.id idCliente,
            a.id idPrestamo,
            c.id idRutaCobrador,
            a.fecha as fechaPrestamo, 
            b.nombre, 
            b.dpi, 
            b.telefono, 
            b.direccion, 
            e.nombres as cobrador,  
            d.nombreRuta, 
            f.montoEntregado, 
            f.montoConInteres, 
            f.plazoDias 
            from prestamos a 
            join clientes b on b.id = a.idCliente and b.id = :id
            join rutasCobradores c on c.id = a.idRutaCobrador
            join rutas d on d.id = c.idRuta
            join cobradores e on e.id = c.idCobrador
            join MontoPrestamos f on f.id = a.idMonto
        `
        const resp = await db.query<PrestamoCliente>(query, { replacements: { id }, type: QueryTypes.SELECT })
        return resp
    }

    async getClientesPorCobrador (idRuta: number){
        try{
            let query = `
                select cli.idRuta, 
                    cli.id, 
                    cli.nombre, 
                    cli.dpi, 
                    cli.telefono, 
                    cli.telefono2, 
                    cli.ocupacion, 
                    cli.negocio, 
                    cli.foto, 
                    cli.fotoCasa, 
                    cli.direccion,
                    cli.nit, 
                    cli.referencia, 
                    cli.createdAt fechaCreado
                from Cliente cli
                left join Prestamo pre on pre.idCliente = cli.id
                left join RutaCobrador rc on rc.id = pre.idRutaCobrador
                where cli.idRuta = :idRuta and 
                (	cli.id not in (select idCliente from Prestamo where activo = 1) or
                    pre.id is null 
                ) 
                group by (cli.id)
            `
            const resp = await db.query<Cliente>(query, { replacements: { idRuta }, type: QueryTypes.SELECT })
            return resp
        }
        catch(excepcion){
            throw excepcion
        }
    }


    async getClientesPorIdRutaNombre(idRuta: number, nombre: string){
        try{
            let query = `
                select cli.idRuta, 
                    cli.id, 
                    cli.nombre, 
                    cli.dpi, 
                    cli.telefono, 
                    cli.telefono2, 
                    cli.ocupacion, 
                    cli.negocio, 
                    cli.foto, 
                    cli.fotoCasa, 
                    cli.direccion,
                    cli.nit, 
                    cli.referencia, 
                    cli.createdAt fechaCreado
                from Cliente cli
                left join Prestamo pre on pre.idCliente = cli.id
                left join RutaCobrador rc on rc.id = pre.idRutaCobrador
                where cli.idRuta = :idRuta and 
                    cli.nombre like :nombre and
                (	
                    cli.id not in (select idCliente from Prestamo where activo = 1) or
                    pre.id is null 
                ) 
                group by (cli.id)
            `
            const resp = await db.query<Cliente>(query, { replacements: { idRuta, nombre: `%${nombre}%` }, type: QueryTypes.SELECT })
            return resp
        }
        catch(excepcion){
            throw excepcion
        }
    }
    
    async create(body: CreateCliente, idCobrador: number): Promise<Response>{
        try{
            let getIdRutaQuery = 'select idRuta from RutaCobrador where idCobrador = :idCobrador'
            const response = await db.query(getIdRutaQuery, { replacements: {idCobrador}, plain: true })

            let query = `
                insert into Cliente (nombre, dpi, telefono, telefono2, ocupacion, negocio, foto, fotoCasa, direccion, nit, referencia, :idRuta, createdAt)
                values (:nombre, :dpi, :telefono, :telefono2, :ocupacion, :negocio, :foto, :fotoCasa, :direccion, :nit, :referencia, :idRuta, :createdAt)
            `
            const replacements = {
                nombre: body.nombre,
                dpi: body.dpi,
                telefono: body.telefono,
                telefono2: body.telefono2,
                ocupacion: body.ocupacion,
                negocio: body.negocio,
                foto: body.foto,
                fotoCasa: body.fotoCasa,
                direccion: body.direccion,
                nit: body.nit,
                referencia: body.referencia,
                idRuta: response!.idRuta,
                createdAt: new Date()
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.INSERT})
            console.log(resp)
            return { success: true, message: 'Cliente creado con exito: ' }
        }
        catch(exception){
            throw exception
        }
    }
    
    async update(body: CreateCliente, id: number): Promise<Response>{
        let query = `
            update clientes 
            set 
                nombre = :nombre, 
                dpi = :dpi, 
                telefono = :telefono, 
                telefono2 = :telefono2, 
                ocupacion = :ocupacion, 
                negocio = :negocio, 
                foto = :foto, 
                fotoCasa = :fotoCasa, 
                direccion = :direccion,
                nit = :nit, :referencia
            where id = :id
        `

        try{
            const replacements = {
                nombre: body.nombre,
                dpi: body.dpi,
                telefono: body.telefono,
                telefono2: body.telefono2,
                ocupacion: body.ocupacion,
                negocio: body.negocio,
                foto: body.foto?.name,
                fotoCasa: body.fotoCasa?.name,
                direccion: body.direccion,
                nit: body.nit,
                referencia: body.referencia,
                id
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.UPDATE})
            return { success: true, message: 'Cliente actualizado con exito: ' }
        }
        catch(exception){
            throw exception
        }
    }
}