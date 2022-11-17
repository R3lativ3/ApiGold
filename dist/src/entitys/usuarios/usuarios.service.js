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
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
class UsuariosService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            INSERT INTO usuarios (nombreUsuario, emailUsuario, psw, salt, idTipoUsuario)
            values (:nombreUsuario, :emailUsuario, :psw, :salt, :idTipoUsuario)
        `;
            try {
                const replacements = {
                    nombreUsuario: body.nombre,
                    emailUsuario: body.email,
                    psw: body.psw,
                    salt: body.salt,
                    idTipoUsuario: body.idTipoUsuario
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.INSERT });
                const [results, metadata] = resp;
                return { success: true, message: `Usuario creado: ${results}, filas afectadas: ${metadata}` };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
        UPDATE usuarios 
        set 
            nombreUsuario = :nombreUsuario, 
            emailUsuario = :emailUsuario, 
            psw = :psw,
            salt = :salt,
            IdTipoUsuario = :IdTipoUsuario
        where id = :id`;
            try {
                const replacements = {
                    nombreUsuario: body.nombre,
                    emailUsuario: body.email,
                    psw: body.psw,
                    salt: body.salt,
                    idTipoUsuario: body.idTipoUsuario,
                    id
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.UPDATE });
                const [results, metadata] = resp;
                return { success: true, message: `Usuario actualizado: ${metadata}, filas afectadas: ${results}` };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT  
                a.id,
                a.nombreUsuario,
                a.emailUsuario,
                b.tipoUsuario
            FROM usuarios a
            join tiposUsuarios b
                on b.id = a.IdTipoUsuario
        `;
            try {
                const resp = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            SELECT  
                a.id,
                a.nombreUsuario,
                a.emailUsuario,
                b.tipoUsuario
            FROM usuarios a
            join tiposUsuarios b
                on b.id = a.IdTipoUsuario
            where a.id = :id
        `;
            try {
                const resp = yield connection_1.default.query(query, {
                    replacements: { id },
                    type: sequelize_1.QueryTypes.SELECT,
                    raw: true
                });
                return resp;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
}
exports.default = UsuariosService;
//# sourceMappingURL=usuarios.service.js.map