import { Request, Response, Router } from "express"
import { container } from "tsyringe"
import ClientesService from "./clientes.service"
import { ValidateCreateCliente, ValidateUpdateCliente } from "./clientes.validator"


export default class ClientesController{
    apiPath = '/api/clientes'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, ValidateCreateCliente, this.create)
        this.router.put(`${this.apiPath}/:id`, ValidateUpdateCliente, this.update)

        return this.router
    }

    async getAll(req: Request, res: Response){
        try{
            const clientesService = container.resolve(ClientesService)
            const resp = await clientesService.getAll()
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async get(req: Request, res: Response){
        try{
            const { id } = req.params
            const clientesService = container.resolve(ClientesService)
            const resp = await clientesService.get(parseInt(id))
            if(resp == null) 
                return res.status(404).send('not found')
            
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async create(req: Request, res: Response){
        try{
            const { body } = req
            const clientesService = container.resolve(ClientesService)
            const response = await clientesService.create(body)
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
            const clientesService = container.resolve(ClientesService)
            const response = await clientesService.update(body, parseInt(id))
            res.json(response)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

}