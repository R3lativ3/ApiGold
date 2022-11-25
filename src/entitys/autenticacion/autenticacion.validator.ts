import { check } from 'express-validator'
import { Request, Response, NextFunction } from "express"
import  validateResult  from '../../helpers/validateHelper'

export const ValidateLogin = [
    check('username')
    .exists().withMessage('Ingresar username')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 6}),

    check('psw')
    .exists().withMessage('Ingresar contraseña')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 6}),

    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]