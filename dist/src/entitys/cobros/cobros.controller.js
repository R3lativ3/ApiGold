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
const cobros_service_1 = __importDefault(require("./cobros.service"));
const authentication_service_1 = __importDefault(require("../autenticacion/authentication.service"));
class CobrosController {
    constructor() {
        this.apiPath = '/api/cobros';
        this.router = (0, express_1.Router)();
    }
    routes() {
        const autenticacion = tsyringe_1.container.resolve(authentication_service_1.default);
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/total-semana`, autenticacion.isAuthenticated, this.getTotalPorSemana);
        this.router.get(`${this.apiPath}/por-fecha`, this.getAllByDate);
        this.router.get(`${this.apiPath}/por-rango-fechas`, this.getTotalByDates);
        this.router.get(`${this.apiPath}/disponibles-cobro/:busqueda`, autenticacion.isAuthenticated, this.getDisponiblesPorIdCobradorBusqueda);
        this.router.get(`${this.apiPath}/disponibles-cobro/`, autenticacion.isAuthenticated, this.getDisponiblesPorIdCobrador);
        this.router.get(`${this.apiPath}/:id`, this.get);
        this.router.post(`${this.apiPath}`, autenticacion.isAuthenticated, this.create);
        this.router.put(`${this.apiPath}/:id`, this.update);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.getAll();
                res.json({ status: 0, response });
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    getAllByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fecha = (req.query.fecha || (new Date()).toLocaleDateString());
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.getAllByDate(new Date(fecha));
                res.json({ status: 0, response });
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    getTotalByDates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                let idRuta = req.query.idRuta;
                let inicio = req.query.inicio;
                let fin = req.query.fin;
                if (!inicio)
                    inicio = cobrosService.getCurrentMonday().toString();
                if (!fin)
                    fin = new Date().toString();
                const response = yield cobrosService.getTotalByDates(parseInt(idRuta), new Date(inicio), new Date(fin));
                res.json({ status: 0, response });
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.get(parseInt(id));
                res.json({ status: 0, response });
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    getDisponiblesPorIdCobrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lel = res.locals.user;
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.getDisponiblesPorIdCobrador(parseInt(lel.id));
                res.json(response);
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    getTotalPorSemana(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.getTotalPorSemana(parseInt(user.id));
                res.json(response);
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    getDisponiblesPorIdCobradorBusqueda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { busqueda } = req.params;
                const user = res.locals.user;
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.getDisponiblesPorIdCobradorBusqueda(parseInt(user.id), busqueda);
                res.json(response);
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.create(body);
                if (response === null) {
                    return res.status(500).json({ status: 1, response: response });
                }
                const lel = Object.values(response)[0];
                return res.status(200).json(lel);
            }
            catch (excepcion) {
                console.log(excepcion);
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { id } = req.params;
                const cobrosService = tsyringe_1.container.resolve(cobros_service_1.default);
                const response = yield cobrosService.update(body, parseInt(id));
                res.json({ status: 0, response });
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
}
exports.default = CobrosController;
//# sourceMappingURL=cobros.controller.js.map