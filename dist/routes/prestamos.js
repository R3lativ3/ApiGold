"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamos_controller_1 = require("../controllers/prestamos.controller");
const router = (0, express_1.Router)();
router.get('/', prestamos_controller_1.getAll);
router.get('/:id', prestamos_controller_1.get);
router.post('/', prestamos_controller_1.create);
router.put('/:id', prestamos_controller_1.update);
router.get('/:id/detail', prestamos_controller_1.getPrestamoDetail);
exports.default = router;
//# sourceMappingURL=prestamos.js.map