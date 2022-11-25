import { Request, Response, Router } from "express"
import AuthenticacionService from "./authentication.service"
import { container } from "tsyringe"
import { ValidateLogin } from "./autenticacion.validator"

export default class AutenticacionController{
    apiPath = '/api/login'

    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(`${this.apiPath}`, ValidateLogin, this.login)
        return this.router
    }

    async login(req: Request, res: Response){
        try{
            const { body } = req
            const autenticacionService = container.resolve(AuthenticacionService)
            const resp = await autenticacionService.login(body)
            if(resp === null){
                return res.status(200).json({error: "Usuario o contraseña invalidos"})
            }
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }
}
