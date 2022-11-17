import { Request, Response, Router } from "express"
import PrestamosService from "./prestamos.service"
import { autoInjectable, container } from "tsyringe"

@autoInjectable()
export default class PrestamosController{
    router: Router
    apiPath = '/api/prestamos'

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/ruta/:id`, this.getAllByRutaId)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, this.create)
        this.router.put(`${this.apiPath}/:id`, this.update)

        return this.router
    }

    PrestamoServiceInstance(){
        return container.resolve(PrestamosService)
    }

    async get(req: Request, res: Response){
        try{
            const { id } = req.params
            const prestamosService = container.resolve(PrestamosService)
            const response = await prestamosService.get(parseInt(id))
            return res.json({ status: 0, response })
        }
        catch(e){
            res.json({ status: 1, response: e })
        }
    }

    async getAll(req: Request, res: Response){
        try{
            const prestamosService = container.resolve(PrestamosService)
            const response = await prestamosService.getAll()
            return res.json({ status: 0, response })
        }
        catch(e){
            return res.json({ status: 1, response: e })
        }
    }

    async getAllByRutaId(req: Request, res: Response){
        try{
            const prestamosService = container.resolve(PrestamosService)
            const response = await prestamosService.getAllByIdRuta(parseInt(req.params.id))
            return res.status(200).json(response)
        }
        catch(e){
            return res.json({ status: 1, response: e })
        }
    }

    async create(req: Request, res: Response){
        try{
            const { body } = req
            const prestamosService = container.resolve(PrestamosService)
            const response = await prestamosService.create(body)
            return res.json({ status: 0, response })
        }
        catch(e){
            res.json({ status: 1, response: e })
        }   
    }

    async update(req: Request, res: Response){
        try{
            const { id } = req.params
            const { body } = req
            const prestamosService = container.resolve(PrestamosService)
            const response = await prestamosService.update(body, parseInt(id))
            return res.json({ status: 0, response })
        }
        catch(e){
            res.json({ status: 1, response: e })
        }
    }

}
