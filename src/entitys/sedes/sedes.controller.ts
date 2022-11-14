import { Request, Response, Router } from "express"
import { container } from "tsyringe";
import SedesService from "./sedes.service";

export default class SedesController{
    router: Router
    apiPath = '/api/sedes'

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(this.apiPath, this.getAll)
        return this.router
    }

    async getAll(req: Request, res: Response){
        try{
            const sedesService = container.resolve(SedesService)
            const resp = await sedesService.getAll()
            if (resp != null) {
                return res.status(200).json(resp)
            }
            return res.status(404).json('no data')
        }
        catch(exception){
            return res.status(500).send(exception)
        }
    }    
}
