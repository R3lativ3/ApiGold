import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../../db/connection"


export const get = async (req: Request, res: Response) => {
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


export const create = (req: Request, res: Response) => {
    const { body } = req
    console.log(body)
    res.json({
        msg: 'post',
        body
    })
}
