"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamosController_1 = require("../controllers/prestamosController");
const router = (0, express_1.Router)();
router.get('/', prestamosController_1.getAll);
router.get('/:id', prestamosController_1.get);
router.post('/', prestamosController_1.create);
router.put('/:id', prestamosController_1.update);
router.get('/:id/detail', prestamosController_1.getPrestamoDetail);
exports.default = router;
//# sourceMappingURL=prestamosRoutes.js.map