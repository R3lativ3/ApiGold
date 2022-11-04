import { check } from 'express-validator'
import  validateResult  from '../helpers/validateHelper'


export const ValidateCreate = [
    check('nombreRuta')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debes agregar un nombre para la ruta'),
    
    check('idSede')
    .exists()
    .isNumeric()
    .withMessage('Debes agregar un id de sede'),

    check('idMunicipio')
    .exists()
    .withMessage('Debes agregar un id de municipio')
    .isNumeric()
    .withMessage('El valor debe ser entero'),

    (req: any, res: any, next: any) => {
        validateResult(req, res, next)
    }
]