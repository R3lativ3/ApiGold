"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutas_1 = require("../controllers/rutas");
const router = (0, express_1.Router)();
router.get('/', rutas_1.getAll);
router.get('/:id', rutas_1.get);
router.post('/', rutas_1.create);
router.put('/:id', rutas_1.update);
exports.default = router;
//# sourceMappingURL=rutas.js.map