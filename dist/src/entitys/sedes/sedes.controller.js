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
const sedes_service_1 = __importDefault(require("./sedes.service"));
class SedesController {
    constructor() {
        this.apiPath = '/api/sedes';
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get(this.apiPath, this.getAll);
        return this.router;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sedesService = tsyringe_1.container.resolve(sedes_service_1.default);
                const resp = yield sedesService.getAll();
                if (resp != null) {
                    return res.status(200).json(resp);
                }
                return res.status(404).json('no data');
            }
            catch (exception) {
                return res.status(500).send(exception);
            }
        });
    }
}
exports.default = SedesController;
//# sourceMappingURL=sedes.controller.js.map