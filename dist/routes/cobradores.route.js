"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobradores_controller_1 = require("../controllers/cobradores.controller");
const router = (0, express_1.Router)();
router.get('/', cobradores_controller_1.getAll);
router.get('/:id', cobradores_controller_1.get);
router.post('/', cobradores_controller_1.create);
router.put('/:id', cobradores_controller_1.update);
router.get('/:id/clientes', cobradores_controller_1.getClientes);
exports.default = router;
//# sourceMappingURL=cobradores.route.js.map