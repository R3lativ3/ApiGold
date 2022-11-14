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
const tsyringe_1 = require("tsyringe");
const usuarios_service_1 = __importDefault(require("./usuarios.service"));
const usuarios_validator_1 = require("./usuarios.validator");
class UsuariosController {
    constructor() {
        this.apiPath = '/api/usuarios';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/:id`, this.get);
        this.router.post(`${this.apiPath}`, usuarios_validator_1.ValidateCreateUsuario, this.create);
        this.router.put(`${this.apiPath}/:id`, this.update);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuariosService = tsyringe_1.container.resolve(usuarios_service_1.default);
                const response = yield usuariosService.getAll();
                return res.status(200).json(response);
            }
            catch (exception) {
                console.log(exception);
                return res.status(500).send(exception);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const usuariosService = tsyringe_1.container.resolve(usuarios_service_1.default);
                const response = yield usuariosService.get(parseInt(id));
                return res.status(200).json(response);
            }
            catch (exception) {
                console.log(exception);
                return res.status(500).send(exception);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const usuariosService = tsyringe_1.container.resolve(usuarios_service_1.default);
                const response = yield usuariosService.create(body);
                return res.status(200).json(response);
            }
            catch (exception) {
                console.log(exception);
                return res.status(500).send(exception);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { id } = req.params;
                const usuariosService = tsyringe_1.container.resolve(usuarios_service_1.default);
                const response = yield usuariosService.update(body, parseInt(id));
                return res.status(200).json(response);
            }
            catch (exception) {
                console.log(exception);
                return res.status(500).send(exception);
            }
        });
    }
}
exports.default = UsuariosController;
//# sourceMappingURL=usuarios.controller.js.map