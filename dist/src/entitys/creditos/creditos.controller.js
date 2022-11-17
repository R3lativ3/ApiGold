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
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
class CreditosController {
    constructor() {
        this.endPoint = '/api/creditos';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(this.endPoint + '/', this.getAll);
        this.router.get(this.endPoint + '/:id', this.get);
        this.router.post(this.endPoint + '/', this.create);
        this.router.put(this.endPoint + '/:id', this.update);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select * from ';
            const resx = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
            res.json({
                response: resx
            });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let query = 'select * from  where id = :id';
            const resp = yield connection_1.default.query(query, {
                replacements: { id },
                type: sequelize_1.QueryTypes.SELECT
            });
            res.json({
                response: resp
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log(body);
            res.json({
                msg: 'post',
                body
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req.params;
            res.json({
                msg: 'put',
                body,
                id
            });
        });
    }
}
exports.default = CreditosController;
//# sourceMappingURL=creditos.controller.js.map