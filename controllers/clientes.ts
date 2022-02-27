import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../db/connection"

export const getAll = async (req: Request, res: Response) => {
    let query = 'select * from clientes'
    const resx = await db.query(query, { type: QueryTypes.SELECT })

    res.json({
        response: resx
    })
}

export const get = async (req: Request, res: Response) => {
    const { id } = req.params
    let query = 'select * from clientes where id = :id'
    const resp = await db.query(query, 
        { 
            replacements: { id },
            type: QueryTypes.SELECT 
        })
    res.json({
        response: resp
    })
}

export const getPrestamosByCliente = async (req: Request, res: Response) => {
    const { id } = req.params
    let query = 'select a.fecha as fechaPrestamo, b.nombres, b.apellidos, b.dpi, b.telefono, b.direccion, '+
                'e.nombres as cobrador,  d.nombreRuta, f.montoEntregado, f.montoConInteres, f.plazoDias '+
                'from prestamos a, clientes b, rutasCobradores c, rutas d, cobradores e, MontoPrestamos f '+
                'where a.idCliente = b.id and a.idRutaCobrador = c.id and c.idRuta = d.id and c.idCobrador = e.id '+
                'and a.idMonto = f.id and a.idCliente = :id'
    const resp = await db.query(query, 
        { 
            replacements: { id },
            type: QueryTypes.SELECT 
        })
    res.json({
        response: resp
    })
}

export const create = (req: Request, res: Response) => {
    const { body } = req
    console.log(body)
    res.json({
        msg: 'postUsuarios',
        body
    })
}

export const update = (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req.params
    res.json({
        msg: 'putUsuarios',
        body,
        id
    })
}