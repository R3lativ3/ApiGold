import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../db/connection"

export const getAll = async (req: Request, res: Response) => {
    let query = 'select * from '
    const resx = await db.query(query, { type: QueryTypes.SELECT })

    res.json({
        response: resx
    })
}

export const get = async (req: Request, res: Response) => {
    const { id } = req.params
    let query = 'select a.*, c.* from cobradores a, rutasCobradores b, rutas c'
                +'where b.idCobrador = a.id and c.id = b.idRuta'
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
        msg: 'post',
        body
    })
}

export const update = (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req.params
    res.json({
        msg: 'put',
        body,
        id
    })
}