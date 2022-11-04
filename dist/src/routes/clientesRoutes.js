"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
const router = (0, express_1.Router)();
router.get('/', clientesController_1.getAll);
router.get('/:id', clientesController_1.get);
router.post('/', clientesController_1.create);
router.put('/:id', clientesController_1.update);
router.get('/:id/prestamos', clientesController_1.getPrestamosByCliente);
exports.default = router;
//# sourceMappingURL=clientesRoutes.js.map