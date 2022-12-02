"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../../helpers/validateHelper"));
exports.ValidateCreate = [
    (0, express_validator_1.check)('nombres')
        .exists().withMessage('debes agregar nombres')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 2 }),
    (0, express_validator_1.check)('apellidos')
        .exists().withMessage('debes agregar apellidos')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 2 }),
    (0, express_validator_1.check)('dpi')
        .exists().withMessage('debes agregar dpi')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 11, max: 11 }),
    (0, express_validator_1.check)('telefono')
        .exists().withMessage('debes agregar telefono')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 8, max: 8 }),
    (0, express_validator_1.check)('idSede')
        .exists().withMessage('debes agregar idSede')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('EL valor debe ser numerico entero'),
    (0, express_validator_1.check)('idUsuario')
        .exists().withMessage('Debes agregar idUsuario')
        .not().isEmpty().withMessage('Debes proporcionar un valor para este campo')
        .isNumeric().withMessage('El valor debe ser numerico entero'),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=cobradores.validator.js.map