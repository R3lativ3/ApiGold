import { Request, Response } from "express"
import cobrosService from "../services/cobrosService"

export const getAll = async (req: Request, res: Response) => {
    try{
        const response = await cobrosService.getAll()
        res.json({ status : 0, response })
    }
    catch(excepcion: any){
        res.json({ status : 1, response: excepcion })
    }
}

export const get = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        console.log(id)
        const response = await cobrosService.get(parseInt(id))
        res.json({ status : 0, response })
    }
    catch(excepcion: any){
        res.json({ status : 1, response: excepcion })
    }
}


export const create = async (req: Request, res: Response) => {
    try{
        const { body } = req
        const response = await cobrosService.create(body)
        res.json({ status : 0, response })
    }
    catch(excepcion: any){
        res.json({ status : 1, response: excepcion })
    }
}

export const update = async (req: Request, res: Response) => {
    try{
        const { body } = req
        const { id } = req.params
        const response = await cobrosService.update(body, parseInt(id))
        res.json({ status : 0, response })
    }
    catch(excepcion: any){
        res.json({ status : 1, response: excepcion })
    }
}