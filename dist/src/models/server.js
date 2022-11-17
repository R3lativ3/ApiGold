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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const prestamos_route_1 = __importDefault(require("../routes/prestamos.route"));
const clientes_route_1 = __importDefault(require("../routes/clientes.route"));
const cobradores_route_1 = __importDefault(require("../routes/cobradores.route"));
const cobros_route_1 = __importDefault(require("../routes/cobros.route"));
const creditos_route_1 = __importDefault(require("../routes/creditos.route"));
const usuarios_route_1 = __importDefault(require("../routes/usuarios.route"));
const sedes_route_1 = __importDefault(require("../routes/sedes.route"));
const rutas_controller_1 = __importDefault(require("../controllers/rutas.controller"));
const tsyringe_1 = require("tsyringe");
class Server {
    constructor() {
        this.apiPaths = {
            prestamos: '/api/prestamos',
            clientes: '/api/clientes',
            cobradores: '/api/cobradores',
            cobros: '/api/cobros',
            creditos: '/api/creditos',
            rutas: '/api/rutas',
            usuarios: '/api/usuarios',
            sedes: '/api/sedes'
        };
        this.app = (0, express_1.default)();
        console.log(process.env.PORT);
        this.port = process.env.PORT || '80';
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
        const rutasController = tsyringe_1.container.resolve(rutas_controller_1.default);
        this.app.use(this.apiPaths.prestamos, prestamos_route_1.default);
        this.app.use(this.apiPaths.clientes, clientes_route_1.default);
        this.app.use(this.apiPaths.cobradores, cobradores_route_1.default);
        this.app.use(this.apiPaths.cobros, cobros_route_1.default);
        this.app.use(this.apiPaths.creditos, creditos_route_1.default);
        this.app.use(this.apiPaths.rutas, rutasController.routes());
        this.app.use(this.apiPaths.usuarios, usuarios_route_1.default);
        this.app.use(this.apiPaths.sedes, sedes_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map