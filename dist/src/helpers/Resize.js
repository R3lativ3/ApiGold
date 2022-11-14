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
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    save(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = this.filename();
                const filePath = this.filePath(fileName);
                yield (0, sharp_1.default)(buffer).resize(300, 300, {
                    fit: sharp_1.default.fit.inside,
                    withoutEnlargement: true
                })
                    .toFile(filePath);
                return fileName;
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    filename() {
        return `${(0, uuid_1.v4)()}.png`;
    }
    filePath(filename) {
        return path_1.default.resolve(`${this.folder}/${filename}`);
    }
}
exports.default = Resize;
//# sourceMappingURL=Resize.js.map