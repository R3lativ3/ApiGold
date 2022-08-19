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
const prestamosRoutes_1 = __importDefault(require("../routes/prestamosRoutes"));
const clientesRoutes_1 = __importDefault(require("../routes/clientesRoutes"));
const cobradoresRoutes_1 = __importDefault(require("../routes/cobradoresRoutes"));
const cobrosRoutes_1 = __importDefault(require("../routes/cobrosRoutes"));
const creditosRoutes_1 = __importDefault(require("../routes/creditosRoutes"));
const rutasRoutes_1 = __importDefault(require("../routes/rutasRoutes"));
const usuariosRoutes_1 = __importDefault(require("../routes/usuariosRoutes"));
class Server {
    constructor() {
        this.apiPaths = {
            prestamos: '/api/prestamos',
            clientes: '/api/clientes',
            cobradores: '/api/cobradores',
            cobros: '/api/cobros',
            creditos: '/api/creditos',
            rutas: '/api/rutas',
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = '443' || '80';
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
        this.app.use(this.apiPaths.prestamos, prestamosRoutes_1.default);
        this.app.use(this.apiPaths.clientes, clientesRoutes_1.default);
        this.app.use(this.apiPaths.cobradores, cobradoresRoutes_1.default);
        this.app.use(this.apiPaths.cobros, cobrosRoutes_1.default);
        this.app.use(this.apiPaths.creditos, creditosRoutes_1.default);
        this.app.use(this.apiPaths.rutas, rutasRoutes_1.default);
        this.app.use(this.apiPaths.usuarios, usuariosRoutes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map