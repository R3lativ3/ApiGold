"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../entitys/clientes/clientes.controller");
const router = (0, express_1.Router)();
router.get('/', clientes_controller_1.getAll);
router.get('/:id', clientes_controller_1.get);
router.post('/', clientes_controller_1.create);
router.put('/:id', clientes_controller_1.update);
router.get('/:id/prestamos', clientes_controller_1.getPrestamosByCliente);
exports.default = router;
//# sourceMappingURL=clientes.route.js.map