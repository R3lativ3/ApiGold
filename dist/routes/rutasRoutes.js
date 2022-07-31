"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutasController_1 = require("../controllers/rutasController");
const router = (0, express_1.Router)();
router.get('/', rutasController_1.ObtenerTodos);
router.get('/:id/prestamos', rutasController_1.ObtenerPrestamosPorRuta);
router.post('/', rutasController_1.create);
router.put('/:id', rutasController_1.update);
exports.default = router;
//# sourceMappingURL=rutasRoutes.js.map