import { check } from 'express-validator'
import  validateResult  from '../../helpers/validateHelper'


export const ValidateCreateCliente = [
    check('nombre')
    .exists().withMessage('debes agregar nombre')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 2}),
 
    check('dpi')
    .exists().isString().withMessage('debes agregar dpi')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 11, max: 11}).withMessage('La longitud de este campo debe ser de 11 caracteres'),

    check('telefono')
    .exists().isString().withMessage('debes agregar telefono')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 8, max: 8}).withMessage('La longitud de este campo debe ser de 8 caracteres'),

    check('telefono2')    
    .isLength({min: 8, max: 8}).withMessage('La longitud de este campo debe ser de 8 caracteres'),

    check('ocupacion')
    .exists().withMessage('debes agregar ocupacion')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo'),

   

    check('negocio')
    .exists().withMessage('debes agregar negocio')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo'),

    check('foto')
    .exists().withMessage('debes agregar negocio')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isBase64().withMessage('debe ser una imagen'),

    check('fotoCasa')
    .exists().withMessage('debes agregar negocio')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isBase64().withMessage('debe ser una imagen'),
    

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]

export const ValidateUpdateCliente = [
    check('nombre')
    .exists().withMessage('debes agregar nombre')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 2}),

    check('dpi')
    .exists().isString().withMessage('debes agregar dpi')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 11, max: 11}).withMessage('La longitud de este campo debe ser de 11 caracteres'),

    check('telefono')
    .exists().isString().withMessage('debes agregar telefono')
    .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
    .isLength({min: 8, max: 8}).withMessage('La longitud de este campo debe ser de 8 caracteres'),

    check('telefono2')    
    .isLength({min: 8, max: 8}).withMessage('La longitud de este campo debe ser de 8 caracteres'),

    check('ocupacion')
    .exists().withMessage('debes agregar ocupacion')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo'),

    check('negocio')
    .exists().withMessage('debes agregar negocio')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo'),

    check('foto')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isBase64().withMessage('debe ser una imagen'),

    check('idMunicipio')
    .exists().withMessage('Debes agregar idMunicipio')
    .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
    .isNumeric().withMessage('El valor debe ser numerico entero'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]