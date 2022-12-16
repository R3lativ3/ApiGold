import { check, query } from 'express-validator'
import  validateResult  from '../../helpers/validateHelper'


export const ValidateCreate = [
    check('cobro')
    .exists().withMessage('debes agregar nombreRuta')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isNumeric().withMessage("El valor debe ser numerico"),
    
    check('idPrestamo')
    .exists().withMessage('debes agregar idPrestamo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('EL valor debe ser numerico entero'),

    check('lat')
    .exists().withMessage('debes agregar latitud')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isNumeric().withMessage("El valor debe ser numerico"),

    check('lon')
    .exists().withMessage('debes agregar longitud')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isNumeric().withMessage("El valor debe ser numerico"),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]

export const ValidateQueryParams = [
    query('fecha')
    .isDate().withMessage('Fecha must be a date type'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]