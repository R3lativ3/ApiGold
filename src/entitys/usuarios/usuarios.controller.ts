import { Request, Response, Router } from "express"
import { container } from "tsyringe"
import UsuariosService from "./usuarios.service"
import { ValidateCreateUsuario } from "./usuarios.validator"

export default class UsuariosController{
    router: Router
    apiPath = '/api/usuarios'

    constructor(){
        this.router = Router()
    }
 
    routes(){
        this.router.get(`${this.apiPath}`, this.getAll)
        this.router.get(`${this.apiPath}/:id`, this.get)
        this.router.post(`${this.apiPath}`, ValidateCreateUsuario, this.create)
        this.router.put(`${this.apiPath}/:id`, this.update)
        return this.router
    }
    
    async getAll(req: Request, res: Response){
        try{
            const usuariosService = container.resolve(UsuariosService)
            const response = await usuariosService.getAll()
            return res.status(200).json(response)
        }
        catch(exception){
            console.log(exception)
            return res.status(500).send(exception)
        }
    }

    async get(req: Request, res: Response){
        try{
            const { id } = req.params
            const usuariosService = container.resolve(UsuariosService)
            const response = await usuariosService.get(parseInt(id))
            return res.status(200).json(response)
        }
        catch(exception){
            console.log(exception)
            return res.status(500).send(exception)
        }
    }


    async create(req: Request, res: Response){
        try{
            const { body } = req
            const usuariosService = container.resolve(UsuariosService)
            const response = await usuariosService.create(body)
            return res.status(200).json(response)
        }
        catch(exception){
            console.log(exception)
            return res.status(500).send(exception)
        }
    }

    async update(req: Request, res: Response){
        try{
            const { body } = req
            const { id } = req.params
            const usuariosService = container.resolve(UsuariosService)
            const response = await usuariosService.update(body, parseInt(id))
            return res.status(200).json(response)
        }
        catch(exception){
            console.log(exception)
            return res.status(500).send(exception)
        }
    }

}