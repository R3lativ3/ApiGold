"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutas_controller_1 = require("../controllers/rutas.controller");
const router = (0, express_1.Router)();
router.get('/', rutas_controller_1.ObtenerTodos);
router.get('/:id/prestamos', rutas_controller_1.ObtenerPrestamosPorRuta);
router.post('/', rutas_controller_1.create);
router.put('/:id', rutas_controller_1.update);
exports.default = router;
//# sourceMappingURL=rutas.js.map