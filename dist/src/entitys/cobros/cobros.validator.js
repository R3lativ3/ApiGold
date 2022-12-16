"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateQueryParams = exports.ValidateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../../helpers/validateHelper"));
exports.ValidateCreate = [
    (0, express_validator_1.check)('cobro')
        .exists().withMessage('debes agregar nombreRuta')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isNumeric().withMessage("El valor debe ser numerico"),
    (0, express_validator_1.check)('idPrestamo')
        .exists().withMessage('debes agregar idPrestamo')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('EL valor debe ser numerico entero'),
    (0, express_validator_1.check)('lat')
        .exists().withMessage('debes agregar latitud')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isNumeric().withMessage("El valor debe ser numerico"),
    (0, express_validator_1.check)('lon')
        .exists().withMessage('debes agregar longitud')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isNumeric().withMessage("El valor debe ser numerico"),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
exports.ValidateQueryParams = [
    (0, express_validator_1.query)('fecha')
        .isDate().withMessage('Fecha must be a date type'),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=cobros.validator.js.map