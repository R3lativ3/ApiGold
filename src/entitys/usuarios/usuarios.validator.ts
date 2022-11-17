import { check } from 'express-validator'
import validateResult from '../../helpers/validateHelper'


export const ValidateCreateUsuario = [
    check('nombre')
        .exists().withMessage('debes agregar nombre')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 2 }),

    check('email')
        .exists().withMessage('debes agregar email')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isEmail().withMessage('EL valor debe ser un email'),

    check('idTipoUsuario')
        .exists().withMessage('Debes agregar idTipoUsuario')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]