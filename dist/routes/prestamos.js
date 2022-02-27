"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamos_1 = require("../controllers/prestamos");
const router = (0, express_1.Router)();
router.get('/', prestamos_1.getAll);
router.get('/:id', prestamos_1.get);
router.post('/', prestamos_1.create);
router.put('/:id', prestamos_1.update);
router.get('/:id/detail', prestamos_1.getPrestamoDetail);
exports.default = router;
//# sourceMappingURL=prestamos.js.map