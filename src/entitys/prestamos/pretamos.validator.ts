import { check } from 'express-validator'
import  validateResult  from '../../helpers/validateHelper'


export const ValidateCreate = [

    check('idRutaCobrador')
    .exists().withMessage('debes agregar este campo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('EL valor debe ser numerico entero'),

    check('idUsuario')
    .exists().withMessage('Debes agregar este campo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    check('idCliente')
    .exists().withMessage('Debes agregar este campo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    check('idTipoPrestamo')
    .exists().withMessage('Debes agregar este campo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    check('idMonto')
    .exists().withMessage('Debes agregar este campo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    check('entregaEfectivo')
    .exists().withMessage('Debes agregar este campo')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isBoolean().withMessage('El valor debe ser booleano'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]
