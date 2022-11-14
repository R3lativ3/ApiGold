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
const rutas_controller_1 = __importDefault(require("../entitys/rutas/rutas.controller"));
const tsyringe_1 = require("tsyringe");
const prestamos_controller_1 = __importDefault(require("../entitys/prestamos/prestamos.controller"));
const creditos_controller_1 = __importDefault(require("../entitys/creditos/creditos.controller"));
const cobros_controller_1 = __importDefault(require("../entitys/cobros/cobros.controller"));
const cobradores_controller_1 = __importDefault(require("../entitys/cobradores/cobradores.controller"));
const clientes_controller_1 = __importDefault(require("../entitys/clientes/clientes.controller"));
const usuarios_controller_1 = __importDefault(require("../entitys/usuarios/usuarios.controller"));
const sedes_controller_1 = __importDefault(require("../entitys/sedes/sedes.controller"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            sedes: '/api/sedes'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '80';
        console.log(this.port);
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
        const prestamos = tsyringe_1.container.resolve(prestamos_controller_1.default);
        this.app.use(prestamos.routes());
        const rutas = tsyringe_1.container.resolve(rutas_controller_1.default);
        this.app.use(rutas.routes());
        const creditos = tsyringe_1.container.resolve(creditos_controller_1.default);
        this.app.use(creditos.routes());
        const cobros = tsyringe_1.container.resolve(cobros_controller_1.default);
        this.app.use(cobros.routes());
        const cobradores = tsyringe_1.container.resolve(cobradores_controller_1.default);
        this.app.use(cobradores.routes());
        const clientes = tsyringe_1.container.resolve(clientes_controller_1.default);
        this.app.use(clientes.routes());
        const usuarios = tsyringe_1.container.resolve(usuarios_controller_1.default);
        this.app.use(usuarios.routes());
        const sedes = tsyringe_1.container.resolve(sedes_controller_1.default);
        this.app.use(sedes.routes());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map