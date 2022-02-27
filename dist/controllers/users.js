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
exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resx = yield connection_1.default.query('SELECT * FROM clientes', { type: sequelize_1.QueryTypes.SELECT });
    res.json({
        msg: resx
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    });
};
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => {
    const { body } = req;
    console.log(body);
    res.json({
        msg: 'postUsuarios',
        body
    });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req.params;
    res.json({
        msg: 'putUsuarios',
        body,
        id
    });
};
exports.putUsuario = putUsuario;
//# sourceMappingURL=users.js.map