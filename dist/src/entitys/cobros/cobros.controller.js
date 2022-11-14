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
const cobros_service_1 = __importDefault(require("./cobros.service"));
class CobrosController {
    constructor() {
        this.apiPath = '/api/cobros';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(`${this.apiPath}`, this.getAll);
        this.router.get(`${this.apiPath}/:id`, this.get);
        this.router.post(`${this.apiPath}`, this.create);
        this.router.put(`${this.apiPath}/:id`, this.update);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cobros_service_1.default.getAll();
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
                console.log(id);
                const response = yield cobros_service_1.default.get(parseInt(id));
                res.json({ status: 0, response });
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
                const response = yield cobros_service_1.default.create(body);
                res.json({ status: 0, response });
            }
            catch (excepcion) {
                res.json({ status: 1, response: excepcion });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { id } = req.params;
                const response = yield cobros_service_1.default.update(body, parseInt(id));
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