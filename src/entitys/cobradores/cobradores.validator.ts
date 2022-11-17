import { check } from 'express-validator'
import  validateResult  from '../../helpers/validateHelper'


export const ValidateCreate = [
    check('nombres')
    .exists().withMessage('debes agregar nombres')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 2}),
    
    check('apellidos')
    .exists().withMessage('debes agregar apellidos')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 2}),

    check('dpi')
    .exists().withMessage('debes agregar dpi')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 11, max: 11}),

    check('telefono')
    .exists().withMessage('debes agregar telefono')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 8, max: 8}),

    check('idSede')
    .exists().withMessage('debes agregar idSede')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('EL valor debe ser numerico entero'),

    check('idUsuario')
    .exists().withMessage('Debes agregar idUsuario')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]