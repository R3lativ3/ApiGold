import { Request, Response } from "express"
import { QueryTypes } from 'sequelize'
import db from "../db/connection"
import Rutas from '../services/rutas.service';


export const getAll = async (res: Response) => {
    const resp = await Rutas.getAll()
    if (resp.success) return res.status(200).json(resp.response)
    return res.status(500).json(resp.response)
}

export const create = (req: Request, res: Response) => {
    const { body } = req
    console.log(body)
    res.json({
        msg: 'post',
        body
    })
}

export const update = (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req.params
    res.json({
        msg: 'put',
        body,
        id
    })
}