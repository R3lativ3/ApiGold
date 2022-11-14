"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../../helpers/validateHelper"));
exports.ValidateCreate = [
    (0, express_validator_1.check)('idRutaCobrador')
        .exists().withMessage('debes agregar este campo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('EL valor debe ser numerico entero'),
    (0, express_validator_1.check)('idUsuario')
        .exists().withMessage('Debes agregar este campo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (0, express_validator_1.check)('idCliente')
        .exists().withMessage('Debes agregar este campo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (0, express_validator_1.check)('idTipoPrestamo')
        .exists().withMessage('Debes agregar este campo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (0, express_validator_1.check)('idMonto')
        .exists().withMessage('Debes agregar este campo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (0, express_validator_1.check)('entregaEfectivo')
        .exists().withMessage('Debes agregar este campo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isBoolean().withMessage('El valor debe ser booleano'),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=pretamos.validator.js.map