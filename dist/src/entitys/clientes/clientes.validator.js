"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCreateCliente = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../../helpers/validateHelper"));
exports.ValidateCreateCliente = [
    (0, express_validator_1.check)('nombre')
        .exists().withMessage('debes agregar nombre')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 2 }),
    (0, express_validator_1.check)('dpi')
        .exists().isString().withMessage('debes agregar dpi')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 11, max: 11 }).withMessage('La longitud de este campo debe ser de 11 caracteres'),
    (0, express_validator_1.check)('telefono')
        .exists().isString().withMessage('debes agregar telefono')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 8, max: 8 }).withMessage('La longitud de este campo debe ser de 8 caracteres'),
    (0, express_validator_1.check)('telefono2')
        .isLength({ min: 8, max: 8 }).withMessage('La longitud de este campo debe ser de 8 caracteres'),
    (0, express_validator_1.check)('ocupacion')
        .exists().withMessage('debes agregar ocupacion')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo'),
    (0, express_validator_1.check)('negocio')
        .exists().withMessage('debes agregar negocio')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo'),
    (0, express_validator_1.check)('foto')
        .exists().withMessage('debes agregar negocio')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isBase64().withMessage('debe ser una imagen'),
    (0, express_validator_1.check)('idMunicipio')
        .exists().withMessage('Debes agregar idMunicipio')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=clientes.validator.js.map