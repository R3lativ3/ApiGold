"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const router = (0, express_1.Router)();
router.get('/', usuariosController_1.getAll);
router.get('/:id', usuariosController_1.get);
router.post('/', usuariosController_1.create);
router.put('/:id', usuariosController_1.update);
exports.default = router;
//# sourceMappingURL=usuariosRoutes.js.map