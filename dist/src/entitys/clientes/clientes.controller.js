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
const clientes_service_1 = __importDefault(require("./clientes.service"));
const clientes_validator_1 = require("./clientes.validator");
class ClientesController {
    constructor() {
        this.apiPath = '/api/clientes';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/:id`, this.get);
        this.router.post(`${this.apiPath}`, clientes_validator_1.ValidateCreateCliente, this.create);
        this.router.put(`${this.apiPath}/:id`, clientes_validator_1.ValidateUpdateCliente, this.update);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                const resp = yield clientesService.getAll();
                return res.status(200).json(resp);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                const resp = yield clientesService.get(parseInt(id));
                if (resp == null)
                    return res.status(404).send('not found');
                return res.status(200).json(resp);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                const response = yield clientesService.create(body);
                res.json(response);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                const response = yield clientesService.update(body, parseInt(id));
                res.json(response);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
}
exports.default = ClientesController;
//# sourceMappingURL=clientes.controller.js.map