"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobradoresController_1 = require("../controllers/cobradoresController");
const router = (0, express_1.Router)();
router.get('/', cobradoresController_1.getAll);
router.get('/:id', cobradoresController_1.get);
router.post('/', cobradoresController_1.create);
router.put('/:id', cobradoresController_1.update);
router.get('/:id/clientes', cobradoresController_1.getClientes);
exports.default = router;
//# sourceMappingURL=cobradoresRoutes.js.map