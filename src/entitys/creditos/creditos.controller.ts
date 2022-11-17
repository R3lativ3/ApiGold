import { Request, Response, Router } from "express"
import { QueryTypes } from 'sequelize'
import db from "../../db/connection"

export default class CreditosController{

    endPoint = '/api/creditos'
    router: Router

    constructor(){
        this.router = Router()
    }

    routes(){
        this.router.get(this.endPoint+'/', this.getAll)
        this.router.get(this.endPoint+'/:id', this.get)
        this.router.post(this.endPoint+'/', this.create)
        this.router.put(this.endPoint+'/:id', this.update)
        return this.router
    }

    async getAll(req: Request, res: Response){
        let query = 'select * from '
        const resx = await db.query(query, { type: QueryTypes.SELECT })
    
        res.json({
            response: resx
        })
    }

    async get (req: Request, res: Response){
        const { id } = req.params
        let query = 'select * from  where id = :id'
        const resp = await db.query(query, 
            { 
                replacements: { id },
                type: QueryTypes.SELECT 
            })
        res.json({
            response: resp
        })
    }

    async create(req: Request, res: Response){
        const { body } = req
        console.log(body)
        res.json({
            msg: 'post',
            body
        })
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const { body } = req.params
        res.json({
            msg: 'put',
            body,
            id
        })
    }
}