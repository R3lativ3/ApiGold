"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamos_controller_1 = require("../entitys/prestamos/prestamos.controller");
const router = (0, express_1.Router)();
router.get('/', prestamos_controller_1.getAll);
router.get('/ruta/:id', prestamos_controller_1.getAllByRutaId);
router.get('/:id', prestamos_controller_1.get);
router.post('/', prestamos_controller_1.create);
router.put('/:id', prestamos_controller_1.update);
exports.default = router;
//# sourceMappingURL=prestamos.route.js.map