import { Request, Response, Router } from "express"
import { container } from "tsyringe"
import AuthenticacionService from "../autenticacion/authentication.service"
import ClientesService from "./clientes.service"
import { ValidateCreateCliente, ValidateUpdateCliente } from "./clientes.validator"
import storage from "../../helpers/multer"
import RutasService from "../rutas/rutas.service"

export default class ClientesController{
    apiPath = '/api/clientes'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        const autenticacion = container.resolve(AuthenticacionService)
        this.router.get(`${this.apiPath}`,autenticacion.isAuthenticated, this.getAll)
        this.router.get(`${this.apiPath}/por-cobrador/:nombre`, autenticacion.isAuthenticated, this.getClientesPorCobradorBusqueda)
        this.router.get(`${this.apiPath}/por-cobrador`, autenticacion.isAuthenticated, this.getClientesPorCobrador)
        this.router.get(`${this.apiPath}/:id`, autenticacion.isAuthenticated, this.get)
        this.router.post(
            `${this.apiPath}`, 
            autenticacion.isAuthenticated, 
            //ValidateCreateCliente, 
            storage.fields([{name: 'foto', maxCount: 1},{name: 'fotoCasa', maxCount: 1}]), 
            this.create
        )
        this.router.put(`${this.apiPath}/:id`, autenticacion.isAuthenticated, ValidateUpdateCliente, this.update)

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

    async getClientesPorCobrador(req: Request, res: Response){
        try{
            // obtener cobrador logueado
            const user = res.locals.user
            // dependencias clientes para buscar todos los clientes y rutas para obtener el id de ruta del cobrador logueado.
            const rutasService = container.resolve(RutasService)
            // obtener idRuta por el cobrador logueado
            const idRuta = await rutasService.ObtenerIdRutaPorIdCobrador(user.id)
            // si no existe ruta asociada, devolver error.
            if(idRuta === null){
                return res.status(403).send('No existe ninguna ruta asociada al cobrador que realiza la peticion')
            }
            const clientesService = container.resolve(ClientesService)
            // buscar clientes asociados a la ruta
            const resp = await clientesService.getClientesPorCobrador(idRuta)
            // si no existen clientes asociados a la ruta, devolver not found.
            if(resp == null) {
                return res.status(404).send('not found')
            }
            return res.status(200).json(resp)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

    async getClientesPorCobradorBusqueda(req: Request, res: Response){
        try{
            const user = res.locals.user
            const rutasService = container.resolve(RutasService)
            const idRuta = await rutasService.ObtenerIdRutaPorIdCobrador(user.id)
            if(idRuta === null)
                return res.status(403).send('No existe ninguna ruta asociada al cobrador que realiza la peticion')
            
            const clientesService = container.resolve(ClientesService)
            const resp = await clientesService.getClientesPorIdRutaNombre(idRuta, req.params.nombre)
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
            const files = req.files
            if(files !== undefined){
                body.fotoCasa = files.fotoCasa?.length > 0 ? files.fotoCasa[0].filename : null
                body.foto = files.foto?.length > 0 ? files.foto[0].filename : null
            }
            const clientesService = container.resolve(ClientesService)
            const response = await clientesService.create(body, res.locals.user.id)
            return res.status(201).json(response) 
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
            return res.status(200).json(response)
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }

}