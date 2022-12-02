"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateLogin = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = __importDefault(require("../../helpers/validateHelper"));
exports.ValidateLogin = [
    (0, express_validator_1.check)('username')
        .exists().withMessage('Ingresar username')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 6 }),
    (0, express_validator_1.check)('psw')
        .exists().withMessage('Ingresar contraseña')
        .not().isEmpty().withMessage('Debes proporpcionar un valor para este campo')
        .isLength({ min: 6 }),
    (req, res, next) => {
        (0, validateHelper_1.default)(req, res, next);
    }
];
//# sourceMappingURL=autenticacion.validator.js.map