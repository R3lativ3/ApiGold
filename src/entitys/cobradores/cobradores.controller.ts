import { Request, Response, Router } from "express"
import { container } from "tsyringe";
import CobradoresService from "./cobradores.service";
import Cobradores from './cobradores.service';

export default class CobradoresController{
    apiPath = '/api/cobradores'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/totales-semana-actual/:id`, this.get)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, this.create)
        this.router.put(`${this.apiPath}/:id`, this.update)
        this.router.get(`${this.apiPath}/:id/clientes`, this.getClientes)

        return this.router
    }

    async getAll(req: Request, res: Response){
        try{
            const cobradoresService = container.resolve(CobradoresService)
            const resp = await cobradoresService.getAll()
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async get(req: Request, res: Response){
        try{
            const { id } = req.params
            const cobradoresService = container.resolve(CobradoresService)
            const resp = await cobradoresService.get(parseInt(id))
            if(resp == null) 
                return res.status(404).send('not found')
            
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async getTotalesSemanaPorCobradorId(req: Request, res: Response){
        try{
            const { id } = req.params
            const cobradoresService = container.resolve(CobradoresService)
            const resp = await cobradoresService.getTotalesSemanaPorCobradorId(parseInt(id))
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async create(req: Request, res: Response){
        try{
            const { body } = req
            const cobradoresService = container.resolve(CobradoresService)
            const response = await cobradoresService.create(body)
            res.json(response) 
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async update(req: Request, res: Response){
        try{
            const { id } = req.params
            const { body } = req
            const cobradoresService = container.resolve(CobradoresService)
            const response = await cobradoresService.update(body, parseInt(id))
            res.json(response)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async getClientes(req: Request, res: Response){
        try{
            const { id } = req.params
            const cobradoresService = container.resolve(CobradoresService)
            const response = await cobradoresService.getPrestamosByCobradorId(parseInt(id))
            res.json(response)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

}