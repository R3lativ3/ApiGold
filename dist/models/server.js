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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("../routes/user"));
const prestamos_1 = __importDefault(require("../routes/prestamos"));
const clientes_1 = __importDefault(require("../routes/clientes"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            prestamos: '/api/prestamos',
            clientes: '/api/clientes'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.databaseConnection();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    databaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, user_1.default);
        this.app.use(this.apiPaths.prestamos, prestamos_1.default);
        this.app.use(this.apiPaths.clientes, clientes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map