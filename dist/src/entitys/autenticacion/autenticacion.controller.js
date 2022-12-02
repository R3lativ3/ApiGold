"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_service_1 = __importDefault(require("./authentication.service"));
const tsyringe_1 = require("tsyringe");
const autenticacion_validator_1 = require("./autenticacion.validator");
class AutenticacionController {
    constructor() {
        this.apiPath = '/api/login';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(`${this.apiPath}`, autenticacion_validator_1.ValidateLogin, this.login);
        return this.router;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const autenticacionService = tsyringe_1.container.resolve(authentication_service_1.default);
                const resp = yield autenticacionService.login(body);
                if (resp === null) {
                    return res.status(200).json({ error: "Usuario o contraseña invalidos" });
                }
                return res.status(200).json(resp);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
}
exports.default = AutenticacionController;
//# sourceMappingURL=autenticacion.controller.js.map