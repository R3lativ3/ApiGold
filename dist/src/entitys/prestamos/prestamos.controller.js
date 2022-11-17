"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const prestamos_service_1 = __importDefault(require("./prestamos.service"));
const tsyringe_1 = require("tsyringe");
let PrestamosController = class PrestamosController {
    constructor() {
        this.apiPath = '/api/prestamos';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/ruta/:id`, this.getAllByRutaId);
        this.router.get(`${this.apiPath}/:id`, this.get);
        this.router.post(`${this.apiPath}`, this.create);
        this.router.put(`${this.apiPath}/:id`, this.update);
        return this.router;
    }
    PrestamoServiceInstance() {
        return tsyringe_1.container.resolve(prestamos_service_1.default);
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const prestamosService = tsyringe_1.container.resolve(prestamos_service_1.default);
                const response = yield prestamosService.get(parseInt(id));
                return res.json({ status: 0, response });
            }
            catch (e) {
                res.json({ status: 1, response: e });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prestamosService = tsyringe_1.container.resolve(prestamos_service_1.default);
                const response = yield prestamosService.getAll();
                return res.json({ status: 0, response });
            }
            catch (e) {
                return res.json({ status: 1, response: e });
            }
        });
    }
    getAllByRutaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prestamosService = tsyringe_1.container.resolve(prestamos_service_1.default);
                const response = yield prestamosService.getAllByIdRuta(parseInt(req.params.id));
                return res.status(200).json(response);
            }
            catch (e) {
                return res.json({ status: 1, response: e });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const prestamosService = tsyringe_1.container.resolve(prestamos_service_1.default);
                const response = yield prestamosService.create(body);
                return res.json({ status: 0, response });
            }
            catch (e) {
                res.json({ status: 1, response: e });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const prestamosService = tsyringe_1.container.resolve(prestamos_service_1.default);
                const response = yield prestamosService.update(body, parseInt(id));
                return res.json({ status: 0, response });
            }
            catch (e) {
                res.json({ status: 1, response: e });
            }
        });
    }
};
PrestamosController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], PrestamosController);
exports.default = PrestamosController;
//# sourceMappingURL=prestamos.controller.js.map