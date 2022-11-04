"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutasController_1 = require("../controllers/rutasController");
const rutas_1 = require("../validators/rutas");
const router = (0, express_1.Router)();
router.get('/', rutasController_1.ObtenerTodos);
router.get('/sede/:id', rutasController_1.GetAllByIdRuta);
router.get('/:id/prestamos', rutasController_1.ObtenerPrestamosPorRuta);
router.post('/', rutas_1.ValidateCreate, rutasController_1.create);
router.put('/:id', rutasController_1.update);
exports.default = router;
//# sourceMappingURL=rutasRoutes.js.map