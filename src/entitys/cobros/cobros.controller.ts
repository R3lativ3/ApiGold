import { Request, Response, Router } from "express"
import cobrosService from "./cobros.service"

export default class CobrosController{
    apiPath = '/api/cobros'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, this.create)
        this.router.put(`${this.apiPath}/:id`, this.update)
        return this.router
    }

    async getAll(req: Request, res: Response){
        try{
            const response = await cobrosService.getAll()
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async get(req: Request, res: Response){
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

    async create(req: Request, res: Response){
        try{
            const { body } = req
            const response = await cobrosService.create(body)
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async update(req: Request, res: Response){
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
}