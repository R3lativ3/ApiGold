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
const tsyringe_1 = require("tsyringe");
const rutas_service_1 = __importDefault(require("../services/rutas.service"));
const rutas_validator_1 = require("../validators/rutas.validator");
const tsyringe_2 = require("tsyringe");
let RutasController = class RutasController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get('/', this.ObtenerTodos);
        this.router.get('/sede/:id', this.GetAllByIdRuta);
        this.router.get('/:id/prestamos', this.ObtenerPrestamosPorRuta);
        this.router.post('/', rutas_validator_1.ValidateCreate, this.create);
        this.router.put('/:id', this.update);
        return this.router;
    }
    getInstance() {
        return tsyringe_2.container.resolve(rutas_service_1.default);
    }
    ObtenerTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.getInstance().getAll();
                return res.status(200).json(response);
            }
            catch (exception) {
                console.log(exception);
                return res.status(500).send(exception);
            }
        });
    }
    GetAllByIdRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.getInstance().getAllByIdSede(parseInt(req.params.id));
                return res.status(200).json(response);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    ObtenerPrestamosPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!parseInt(id)) {
                    return res.status(400).json({ error: 'Invalid request params' });
                }
                const resp = yield this.getInstance().ObtenerPrestamosPorRuta(parseInt(id));
                return res.status(200).json(resp);
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            if (!this.getInstance().isValidCreateRequest(body))
                return res.status(400).json({ error: 'Invalid request body' });
            const response = yield this.getInstance().create(body);
            return res.json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const response = yield this.getInstance().update(body, parseInt(id));
            return res.json(response);
        });
    }
};
RutasController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], RutasController);
exports.default = RutasController;
//# sourceMappingURL=rutas.controller.js.map