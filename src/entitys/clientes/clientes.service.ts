import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Cliente, CreateCliente, PrestamoCliente } from "./cliente"
import { Response } from "../../app/general"
import { Express, response } from "express"
import Resize from "../../helpers/Resize"
import path from 'path'

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
                fechaCreado
            from clientes
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
                fechaCreado
            from clientes
            where id = :id
        `
        const resp = await db.query(query, { replacements: { id }, type: QueryTypes.SELECT })
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
    
    async create(body: CreateCliente): Promise<Response>{
        let query = `
            insert into clientes (nombre, dpi, telefono, telefono2, ocupacion, negocio, foto, fotoCasa, direccion, nit, referencia)
            values (:nombre, :dpi, :telefono, :telefono2, :ocupacion, :negocio, :foto, :fotoCasa, :direccion, :nit, :referencia)
        `
        try{
            const f = 'hola'
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
                referencia: body.referencia
            }
            const imgPath = path.join(__dirname, '/public/images')
            const resize = new Resize(imgPath)
            if(body.foto){
                const arrBuf = await body.foto.arrayBuffer()
                const fileName = await resize.save(Buffer.from(arrBuf)).then(console.log)
                console.log(fileName)
            }
            const resp = await db.query(query, { replacements, type: QueryTypes.INSERT})
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