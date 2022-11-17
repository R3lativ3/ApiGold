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
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const Resize_1 = __importDefault(require("../../helpers/Resize"));
const path_1 = __importDefault(require("path"));
class ClientesService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select id, 
                nombre,
                dpi,
                telefono,
                telefono2,
                ocupacion,
                negocio,
                foto,
                fotoCasa,
                direccion,
                nit,
                referencia,
                fechaCreado
            from clientes
        `;
            const resx = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
            return resx;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select id, 
                nombre,
                dpi,
                telefono,
                telefono2,
                ocupacion,
                negocio,
                foto,
                fotoCasa,
                direccion,
                nit,
                referencia,
                fechaCreado
            from clientes
            where id = :id
        `;
            const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
            return resp;
        });
    }
    getPrestamosByCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            select 
            b.id idCliente,
            a.id idPrestamo,
            c.id idRutaCobrador,
            a.fecha as fechaPrestamo, 
            b.nombre, 
            b.dpi, 
            b.telefono, 
            b.direccion, 
            e.nombres as cobrador,  
            d.nombreRuta, 
            f.montoEntregado, 
            f.montoConInteres, 
            f.plazoDias 
            from prestamos a 
            join clientes b on b.id = a.idCliente and b.id = :id
            join rutasCobradores c on c.id = a.idRutaCobrador
            join rutas d on d.id = c.idRuta
            join cobradores e on e.id = c.idCobrador
            join MontoPrestamos f on f.id = a.idMonto
        `;
            const resp = yield connection_1.default.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT });
            return resp;
        });
    }
    create(body) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            insert into clientes (nombre, dpi, telefono, telefono2, ocupacion, negocio, foto, fotoCasa, direccion, nit, referencia)
            values (:nombre, :dpi, :telefono, :telefono2, :ocupacion, :negocio, :foto, :fotoCasa, :direccion, :nit, :referencia)
        `;
            try {
                const f = 'hola';
                const replacements = {
                    nombre: body.nombre,
                    dpi: body.dpi,
                    telefono: body.telefono,
                    telefono2: body.telefono2,
                    ocupacion: body.ocupacion,
                    negocio: body.negocio,
                    foto: (_a = body.foto) === null || _a === void 0 ? void 0 : _a.name,
                    fotoCasa: (_b = body.fotoCasa) === null || _b === void 0 ? void 0 : _b.name,
                    direccion: body.direccion,
                    nit: body.nit,
                    referencia: body.referencia
                };
                const imgPath = path_1.default.join(__dirname, '/public/images');
                const resize = new Resize_1.default(imgPath);
                if (body.foto) {
                    const arrBuf = yield body.foto.arrayBuffer();
                    const fileName = yield resize.save(Buffer.from(arrBuf)).then(console.log);
                    console.log(fileName);
                }
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.INSERT });
                return { success: true, message: 'Cliente creado con exito: ' };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
    update(body, id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let query = `
            update clientes 
            set 
                nombre = :nombre, 
                dpi = :dpi, 
                telefono = :telefono, 
                telefono2 = :telefono2, 
                ocupacion = :ocupacion, 
                negocio = :negocio, 
                foto = :foto, 
                fotoCasa = :fotoCasa, 
                direccion = :direccion,
                nit = :nit, :referencia
            where id = :id
        `;
            try {
                const replacements = {
                    nombre: body.nombre,
                    dpi: body.dpi,
                    telefono: body.telefono,
                    telefono2: body.telefono2,
                    ocupacion: body.ocupacion,
                    negocio: body.negocio,
                    foto: (_a = body.foto) === null || _a === void 0 ? void 0 : _a.name,
                    fotoCasa: (_b = body.fotoCasa) === null || _b === void 0 ? void 0 : _b.name,
                    direccion: body.direccion,
                    nit: body.nit,
                    referencia: body.referencia,
                    id
                };
                const resp = yield connection_1.default.query(query, { replacements, type: sequelize_1.QueryTypes.UPDATE });
                return { success: true, message: 'Cliente actualizado con exito: ' };
            }
            catch (exception) {
                throw exception;
            }
        });
    }
}
exports.default = ClientesService;
//# sourceMappingURL=clientes.service.js.map