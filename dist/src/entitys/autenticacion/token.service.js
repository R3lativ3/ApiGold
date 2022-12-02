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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
class TokenService {
    encrypt(salt, psw) {
        const key = crypto_1.default.pbkdf2Sync(psw, salt, 1000, 64, 'sha1');
        return key.toString('base64');
    }
    signPsw(psw) {
        const salt = crypto_1.default.randomBytes(16).toString('base64');
        const encrypted = this.encrypt(salt, psw);
        console.log(encrypted);
        return { salt, key: encrypted };
    }
    getToken(idUsuario, nombre, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const claims = {
                id: idUsuario.toString(),
                name: nombre,
                rol
            };
            const token = jsonwebtoken_1.default.sign(claims, 'jajajaja', { expiresIn: '60 minute' });
            return token;
        });
    }
    validateToken(token) {
        if (!token)
            return false;
        const decoded = jsonwebtoken_1.default.verify(token, 'jajajaja');
        return (decoded === null || decoded === void 0 ? void 0 : decoded.length) > 0;
    }
}
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map