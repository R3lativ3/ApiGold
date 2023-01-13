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
const crypto_js_1 = __importDefault(require("crypto-js"));
class TokenService {
    encryptJs(psw) {
        return crypto_js_1.default.AES.encrypt(psw, 'perromon').toString();
    }
    decryptJs(encrypt) {
        const bytes = crypto_js_1.default.AES.decrypt(encrypt, 'perromon');
        const text = bytes.toString(crypto_js_1.default.enc.Utf8);
        return text;
    }
    getToken(idUsuario, nombre, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const claims = {
                id: idUsuario.toString(),
                name: nombre,
                rol
            };
            const token = jsonwebtoken_1.default.sign(claims, 'jajajaja', { expiresIn: '1 year' });
            return token;
        });
    }
    validateToken(token) {
        if (!token)
            return "";
        const decoded = jsonwebtoken_1.default.verify(token, 'jajajaja');
        return decoded;
    }
}
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map