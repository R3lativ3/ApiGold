"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = require("../controllers/clientes");
const router = (0, express_1.Router)();
router.get('/', clientes_1.getAll);
router.get('/:id', clientes_1.get);
router.post('/', clientes_1.create);
router.put('/:id', clientes_1.update);
router.get('/:id/prestamos', clientes_1.getPrestamosByCliente);
exports.default = router;
//# sourceMappingURL=clientesRoutes.js.map