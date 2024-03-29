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
const cobradores_service_1 = __importDefault(require("./cobradores.service"));
class CobradoresController {
    constructor() {
        this.apiPath = '/api/cobradores';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/totales-semana-actual/:id`, this.get);
        this.router.get(`${this.apiPath}/:id`, this.get);
        this.router.post(`${this.apiPath}`, this.create);
        this.router.put(`${this.apiPath}/:id`, this.update);
        this.router.get(`${this.apiPath}/:id/clientes`, this.getClientes);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cobradoresService = tsyringe_1.container.resolve(cobradores_service_1.default);
                const resp = yield cobradoresService.getAll();
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
                const cobradoresService = tsyringe_1.container.resolve(cobradores_service_1.default);
                const resp = yield cobradoresService.get(parseInt(id));
                if (resp == null)
                    return res.status(404).send('not found');
                return res.status(200).json(resp);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    getTotalesSemanaPorCobradorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cobradoresService = tsyringe_1.container.resolve(cobradores_service_1.default);
                const resp = yield cobradoresService.getTotalesSemanaPorCobradorId(parseInt(id));
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
                const cobradoresService = tsyringe_1.container.resolve(cobradores_service_1.default);
                const response = yield cobradoresService.create(body);
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
                const cobradoresService = tsyringe_1.container.resolve(cobradores_service_1.default);
                const response = yield cobradoresService.update(body, parseInt(id));
                res.json(response);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cobradoresService = tsyringe_1.container.resolve(cobradores_service_1.default);
                const response = yield cobradoresService.getPrestamosByCobradorId(parseInt(id));
                res.json(response);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
}
exports.default = CobradoresController;
//# sourceMappingURL=cobradores.controller.js.map