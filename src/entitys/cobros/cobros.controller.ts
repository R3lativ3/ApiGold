import { Request, Response, Router } from "express"
import { container } from "tsyringe"
import CobrosService from "./cobros.service"
import { ValidateQueryParams } from "./cobros.validator"

export default class CobrosController{
    apiPath = '/api/cobros'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/por-fecha`, this.getAllByDate)
        this.router.get(`${this.apiPath}/por-rango-fechas`, this.getTotalByDates)
        this.router.get(`${this.apiPath}/disponibles-cobro/:idCobrador`, this.getDisponiblesPorIdCobrador)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, this.create)
        this.router.put(`${this.apiPath}/:id`, this.update)

        return this.router
    }

    async getAll(req: Request, res: Response){
        try{
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.getAll()
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async getAllByDate(req: Request, res: Response){
        try{
            const fecha = (req.query.fecha || (new Date()).toLocaleDateString()) as string
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.getAllByDate(new Date(fecha))
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async getTotalByDates(req: Request, res: Response){
        try{
            const cobrosService = container.resolve(CobrosService)

            let idRuta  = req.query.idRuta as string
            let inicio  = req.query.inicio as string 
            let fin  = req.query.fin as string

            if(!inicio) inicio = cobrosService.getCurrentMonday().toString()

            if(!fin) fin = new Date().toString()

            const response = await cobrosService.getTotalByDates(parseInt(idRuta), new Date(inicio), new Date(fin))
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async get(req: Request, res: Response){
        try{
            const { id } = req.params
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.get(parseInt(id))
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async getDisponiblesPorIdCobrador(req: Request, res: Response){
        try{
            const { idCobrador } = req.params
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.getDisponiblesPorIdCobrador(parseInt(idCobrador))
            console.log(response)
            res.json(response)
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async create(req: Request, res: Response){
        try{
            const { body } = req
            const cobrosService = container.resolve(CobrosService)
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
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.update(body, parseInt(id))
            res.json({ status : 0, response })
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }
}