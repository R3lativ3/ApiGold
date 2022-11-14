import { Request, Response, Router } from "express"
import { autoInjectable } from "tsyringe";
import RutasService from "./rutas.service";
import { ValidateCreate } from "./rutas.validator";
import { container  } from "tsyringe";

@autoInjectable()
export default class RutasController{
    router: Router
    apiPath = '/api/rutas'

    constructor(){
        this.router = Router()
    }
 
    routes(){
        this.router.get(`${this.apiPath}`, this.ObtenerTodos)
        this.router.get(`${this.apiPath}/sede/:id`, this.GetAllByIdRuta)
        this.router.get(`${this.apiPath}/:id/prestamos`, this.ObtenerPrestamosPorRuta)
        this.router.post(`${this.apiPath}`, ValidateCreate, this.create)
        this.router.put(`${this.apiPath}/:id`, this.update)
        return this.router
    }
    
    async ObtenerTodos(req: Request, res: Response){
        try{
            const rutasService = container.resolve(RutasService)
            const response = await rutasService.getAll()
            return res.status(200).json(response)
        }
        catch(exception){
            console.log(exception)
            return res.status(500).send(exception)
        }
    }

    async GetAllByIdRuta(req: Request, res: Response){
        try{
            const rutasService = container.resolve(RutasService)
            const response = await rutasService.getAllByIdSede(parseInt(req.params.id))
            return res.status(200).json(response)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async ObtenerPrestamosPorRuta(req: Request, res: Response){
        try{
            const { id } = req.params
            if (!parseInt(id)){
                return res.status(400).json({error: 'Invalid request params'})
            }
            const rutasService = container.resolve(RutasService)
            const resp = await rutasService.ObtenerPrestamosPorRuta(parseInt(id))
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async create(req: Request, res: Response){
        try{
            const { body } = req
            const rutasService = container.resolve(RutasService)
            const response = await rutasService.create(body)
            return res.status(200).json(response) 
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async update(req: Request, res: Response){
        try{
            const { id } = req.params
            const { body } = req
            const rutasService = container.resolve(RutasService)
            const response = await rutasService.update(body, parseInt(id))
            return res.json(response)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

}



