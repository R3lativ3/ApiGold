import { Request, Response } from "express"
import Sedes from '../services/sedesService';

export const getAll = async (req: Request, res: Response) => {
    const resp = await Sedes.getAll()
    if (resp.success) return res.status(200).json(resp.response)
    return res.status(500).json(resp.response)
}
