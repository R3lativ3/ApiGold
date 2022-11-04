import { Request, Response } from "express"
import PrestamosService from "../services/prestamosService"

export const getAll = async (req: Request, res: Response) => {
    try{
        const response = await PrestamosService.getAll()
        return res.json({ status: 0, response })
    }
    catch(e){
        return res.json({ status: 1, response: e })
    }
}

export const getAllByRutaId = async (req: Request, res: Response) => {
    try{
        const response = await PrestamosService.getAllByIdRuta(parseInt(req.params.id))
        return res.status(200).json(response)
    }
    catch(e){
        return res.json({ status: 1, response: e })
    }
}

export const get = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const response = await PrestamosService.get(parseInt(id))
        return res.json({ status: 0, response })
    }
    catch(e){
        res.json({ status: 1, response: e })
    }
}

export const create = async (req: Request, res: Response) => {
    try{
        const { body } = req
        const response = await PrestamosService.create(body)
        return res.json({ status: 0, response })
    }
    catch(e){
        res.json({ status: 1, response: e })
    }     
}

export const update = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const { body } = req
        const response = await PrestamosService.update(body, parseInt(id))
        return res.json({ status: 0, response })
    }
    catch(e){
        res.json({ status: 1, response: e })
    }
}