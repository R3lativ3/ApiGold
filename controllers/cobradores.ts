import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../db/connection"
import Cobradores from '../services/Cobradores';

export const getAll = async (req: Request, res: Response) => {
    let query = 'select a.*, c.* from cobradores a, rutasCobradores b, rutas c where b.idCobrador = a.id and c.id = b.idRuta'
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


export const create = async (req: Request, res: Response) => {
    const { body } = req

    if(!Cobradores.isValidCreateRequest(body)) res.status(400).json({error: 'Invalid request body'})
    
    const response = await Cobradores.create(body)
    res.json(response) 
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    const response = await Cobradores.update(body, parseInt(id))
    res.json(response)
}



