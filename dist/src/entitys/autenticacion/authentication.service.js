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
const tsyringe_1 = require("tsyringe");
const usuarios_service_1 = __importDefault(require("../usuarios/usuarios.service"));
const token_service_1 = __importDefault(require("./token.service"));
class AuthenticacionService {
    constructor() {
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioService = tsyringe_1.container.resolve(usuarios_service_1.default);
                const user = yield usuarioService.getUserByEmail(credentials.username);
                if (!user)
                    return null;
                const tokenService = tsyringe_1.container.resolve(token_service_1.default);
                const enc = tokenService.decryptJs(user.psw);
                if (enc !== credentials.psw)
                    return null;
                let token = yield tokenService.getToken(user.id, user.nombre, user.tipoUsuario);
                let response = { username: user.email, nombre: user.nombre, token };
                return response;
            }
            catch (excepction) {
                throw excepction;
            }
        });
    }
    isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token) {
                return res.sendStatus(403);
            }
            const tokenService = tsyringe_1.container.resolve(token_service_1.default);
            const validated = tokenService.validateToken(token);
            res.locals.user = validated;
            return validated ? next() : res.sendStatus(403);
        });
    }
}
exports.default = AuthenticacionService;
//# sourceMappingURL=authentication.service.js.map