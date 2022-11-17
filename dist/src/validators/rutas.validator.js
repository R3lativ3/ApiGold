"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../helpers/validateHelper"));
exports.ValidateCreate = [
    (0, express_validator_1.check)('nombreRuta')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Debes agregar un nombre para la ruta'),
    (0, express_validator_1.check)('idSede')
        .exists()
        .isNumeric()
        .withMessage('Debes agregar un id de sede'),
    (0, express_validator_1.check)('idMunicipio')
        .exists()
        .withMessage('Debes agregar un id de municipio')
        .isNumeric()
        .withMessage('El valor debe ser entero'),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=rutas.validator.js.map