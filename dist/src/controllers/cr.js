"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'hex';
const IV_LENGTH = 16;
const KEY = "hoisdoasidknasd";
const encrypt = (data) => {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, new Buffer(KEY), iv);
    return Buffer.concat([cipher.update(data), cipher.final(), iv]).toString(ENCODING);
};
exports.encrypt = encrypt;
const decrypt = (data) => {
    const binaryData = new Buffer(data, ENCODING);
    const iv = binaryData.slice(-IV_LENGTH);
    const encryptedData = binaryData.slice(0, binaryData.length - IV_LENGTH);
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, new Buffer(KEY), iv);
    return Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString();
};
exports.decrypt = decrypt;
//# sourceMappingURL=cr.js.map