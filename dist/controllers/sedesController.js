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
exports.getAll = void 0;
const sedesService_1 = __importDefault(require("../services/sedesService"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield sedesService_1.default.getAll();
    if (resp.success)
        return res.status(200).json(resp.response);
    return res.status(500).json(resp.response);
});
exports.getAll = getAll;
//# sourceMappingURL=sedesController.js.map