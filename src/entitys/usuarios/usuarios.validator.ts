import { check } from 'express-validator'
import  validateResult  from '../../helpers/validateHelper'


export const ValidateCreateUsuario = [
    check('nombreRuta')
    .exists().withMessage('debes agregar nombreRuta')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 2}),
    
    check('idSede')
    .exists().withMessage('debes agregar idSede')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('EL valor debe ser numerico entero'),

    check('idMunicipio')
    .exists().withMessage('Debes agregar idMunicipio')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]