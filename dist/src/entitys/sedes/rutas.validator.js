"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../../helpers/validateHelper"));
exports.ValidateCreate = [
    (0, express_validator_1.check)('nombreRuta')
        .exists().withMessage('debes agregar nombreRuta')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 2 }),
    (0, express_validator_1.check)('idSede')
        .exists().withMessage('debes agregar idSede')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('EL valor debe ser numerico entero'),
    (0, express_validator_1.check)('idMunicipio')
        .exists().withMessage('Debes agregar idMunicipio')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=rutas.validator.js.map