"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
class Authentication {
    signToken(id) {
        return jsonwebtoken_1.default.sign({ id }, 'lel', {
            expiresIn: 60 * 60 * 24 * 365
        });
    }
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
    constructor() {
        const psw = this.signPsw('perromon');
        console.log('salt y encriptacion: ', psw);
        console.log('encryptado segun el salt generado anteriormente: ', this.encrypt(psw.salt, 'perromon'));
    }
}
exports.default = Authentication;
//# sourceMappingURL=authentication.service.js.map