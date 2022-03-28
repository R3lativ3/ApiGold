import { Request, Response } from "express"
import Rutas from '../services/rutas.service';

export const ObtenerTodos = async (res: Response) => {
    const resp = await Rutas.getAll()
    if (resp.success) return res.status(200).json(resp.response)
    return res.status(500).json(resp.response)
}

export const ObtenerPrestamosPorRuta = async (req: Request, res: Response) => {
    const { id } = req.params
    
    if (!parseInt(id)) return res.status(400).json({error: 'Invalid request params'})
    const resp = await Rutas.ObtenerPrestamosPorRuta(parseInt(id))
    if (resp.success) return res.status(200).json(resp.response)
    return res.status(500).json(resp.response)
}

export const create = async (req: Request, res: Response) => {
    const { body } = req
    if(!Rutas.isValidCreateRequest(body)) return res.status(400).json({error: 'Invalid request body'})
    const response = await Rutas.create(body)
    return res.json(response) 
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    const response = await Rutas.update(body, parseInt(id))
    return res.json(response)
}


