import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../db/connection"
import Cobradores from '../services/cobradores.service';

export const getAll = async (req: Request, res: Response) => {
<<<<<<< HEAD:controllers/cobradores.ts
    let query = 'select a.*, c.* from cobradores a, rutasCobradores b, rutas c where b.idCobrador = a.id and c.id = b.idRuta'
    const resx = await db.query(query, { type: QueryTypes.SELECT })

    res.json({
        response: resx
    })
=======
    const resp = await Cobradores.getAll()
    if (resp.success) return res.status(200).json(resp.response)
    return res.status(500).json(resp.response)
>>>>>>> e6265507c0709a85af1f55817d516fbac9f32b8d:controllers/cobradores.controller.ts
}

export const get = async (req: Request, res: Response) => {
    const { id } = req.params
    const resp = await Cobradores.get(parseInt(id))
    if (resp.success && Object.keys(resp.response).length === 0) return res.status(404).json(resp.response)
    if (resp.success) return res.status(200).json(resp.response)
    return res.status(500).json(resp.response)
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

export const getClientes = async (req: Request, res: Response) => {
    const { id } = req.params
    const response = await Cobradores.getClientes(parseInt(id))
    res.json(response)
}



