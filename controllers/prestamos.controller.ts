import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../db/connection"

export const getAll = async (req: Request, res: Response) => {
    let query = 'select a.cobro, a.lat, a.lon, a.fecha, c.nombres, c.apellidos from CobrosPrestamos a, prestamos b, clientes c '+
                'where a.idPrestamo = b.id and b.idCliente = c.id'
    const resx = await db.query(query, { type: QueryTypes.SELECT })

    res.json({
        response: resx
    })
}

export const get = (req: Request, res: Response) => {
    const { id } = req.params
    res.json({
        msg: 'getUsuario',
        id
    })
}

export const getPrestamoDetail = async (req: Request, res: Response) => {
    const { id } = req.params
    let header = 'select a.fecha as fechaPrestamo, b.nombres, b.apellidos, b.dpi, b.telefono, b.direccion, '+
                'e.nombres as cobrador,  d.nombreRuta, f.montoEntregado, f.montoConInteres, f.plazoDias '+
                'from prestamos a, clientes b, rutasCobradores c, rutas d, cobradores e, MontoPrestamos f '+
                'where a.idCliente = b.id and a.idRutaCobrador = c.id and c.idRuta = d.id and c.idCobrador = e.id '+
                'and a.idMonto = f.id and a.id = :id'
    const prestamo = await db.query(header, 
        { 
            replacements: { id },
            type: QueryTypes.SELECT 
        })

    let detail = 'select cobro, lat, lon, fecha from CobrosPrestamos where idPrestamo = :id'
    const pagos = await db.query(detail, 
        { 
            replacements: { id },
            type: QueryTypes.SELECT 
        })

    res.json({
        response: [
            prestamo,
            pagos
        ]
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