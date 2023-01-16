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
const authentication_service_1 = __importDefault(require("../autenticacion/authentication.service"));
const clientes_service_1 = __importDefault(require("./clientes.service"));
const clientes_validator_1 = require("./clientes.validator");
const multer_1 = __importDefault(require("../../helpers/multer"));
const rutas_service_1 = __importDefault(require("../rutas/rutas.service"));
class ClientesController {
    constructor() {
        this.apiPath = '/api/clientes';
        this.router = (0, express_1.Router)();
    }
    routes() {
        const autenticacion = tsyringe_1.container.resolve(authentication_service_1.default);
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/por-cobrador/:nombre`, autenticacion.isAuthenticated, this.getClientesPorCobradorBusqueda);
        this.router.get(`${this.apiPath}/por-cobrador`, autenticacion.isAuthenticated, this.getClientesPorCobrador);
        this.router.get(`${this.apiPath}/:id`, autenticacion.isAuthenticated, this.get);
        this.router.post(`${this.apiPath}`, autenticacion.isAuthenticated, 
        //ValidateCreateCliente, 
        multer_1.default.fields([{ name: 'foto', maxCount: 1 }, { name: 'fotoCasa', maxCount: 1 }]), this.create);
        this.router.put(`${this.apiPath}/:id`, autenticacion.isAuthenticated, clientes_validator_1.ValidateUpdateCliente, this.update);
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
    getClientesPorCobrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // obtener cobrador logueado
                const user = res.locals.user;
                // dependencias clientes para buscar todos los clientes y rutas para obtener el id de ruta del cobrador logueado.
                const rutasService = tsyringe_1.container.resolve(rutas_service_1.default);
                // obtener idRuta por el cobrador logueado
                const idRuta = yield rutasService.ObtenerIdRutaPorIdCobrador(user.id);
                // si no existe ruta asociada, devolver error.
                if (idRuta === null) {
                    return res.status(403).send('No existe ninguna ruta asociada al cobrador que realiza la peticion');
                }
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                // buscar clientes asociados a la ruta
                const resp = yield clientesService.getClientesPorCobrador(idRuta);
                // si no existen clientes asociados a la ruta, devolver not found.
                if (resp == null) {
                    return res.status(404).send('not found');
                }
                return res.status(200).json(resp);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    getClientesPorCobradorBusqueda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                const rutasService = tsyringe_1.container.resolve(rutas_service_1.default);
                const idRuta = yield rutasService.ObtenerIdRutaPorIdCobrador(user.id);
                if (idRuta === null)
                    return res.status(403).send('No existe ninguna ruta asociada al cobrador que realiza la peticion');
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                const resp = yield clientesService.getClientesPorIdRutaNombre(idRuta, req.params.nombre);
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const files = req.files;
                if (files !== undefined) {
                    body.fotoCasa = ((_a = files.fotoCasa) === null || _a === void 0 ? void 0 : _a.length) > 0 ? files.fotoCasa[0].filename : null;
                    body.foto = ((_b = files.foto) === null || _b === void 0 ? void 0 : _b.length) > 0 ? files.foto[0].filename : null;
                }
                const clientesService = tsyringe_1.container.resolve(clientes_service_1.default);
                const response = yield clientesService.create(body, res.locals.user.id);
                return res.status(201).json(response);
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
                return res.status(200).json(response);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
}
exports.default = ClientesController;
//# sourceMappingURL=clientes.controller.js.map