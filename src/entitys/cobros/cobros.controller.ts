import { Request, Response, Router } from "express"
import { container } from "tsyringe"
import CobrosService from "./cobros.service"
import AuthenticacionService from "../autenticacion/authentication.service"

export default class CobrosController{
    apiPath = '/api/cobros'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        const autenticacion = container.resolve(AuthenticacionService)
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/total-semana`, autenticacion.isAuthenticated, this.getTotalPorSemana)
        this.router.get(`${this.apiPath}/por-fecha`, this.getAllByDate)
        this.router.get(`${this.apiPath}/por-rango-fechas`, this.getTotalByDates)
        this.router.get(`${this.apiPath}/disponibles-cobro/:busqueda`, autenticacion.isAuthenticated, this.getDisponiblesPorIdCobradorBusqueda)
        this.router.get(`${this.apiPath}/disponibles-cobro/`, autenticacion.isAuthenticated, this.getDisponiblesPorIdCobrador)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, autenticacion.isAuthenticated, this.create)
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

            let idRuta = req.query.idRuta as string
            let inicio = req.query.inicio as string 
            let fin = req.query.fin as string

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
            const lel = res.locals.user
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.getDisponiblesPorIdCobrador(parseInt(lel.id))
            res.json(response)
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async getTotalPorSemana(req: Request, res: Response){
        try{
            const user = res.locals.user
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.getTotalPorSemana(parseInt(user.id))
            res.json(response)
        }
        catch(excepcion: any){
            res.json({ status : 1, response: excepcion })
        }
    }

    async getDisponiblesPorIdCobradorBusqueda(req: Request, res: Response){
        try{
            const { busqueda } = req.params
            const user = res.locals.user
            const cobrosService = container.resolve(CobrosService)
            const response = await cobrosService.getDisponiblesPorIdCobradorBusqueda(parseInt(user.id), busqueda)
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
            if(response === null){
                return res.status(500).json({ status : 1, response: response })
            }
            const lel = Object.values(response)[0]
            return res.status(200).json(lel)
        }
        catch(excepcion: any){
            console.log(excepcion)
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