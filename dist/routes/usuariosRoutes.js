"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getAll);
router.get('/:id', usuarios_1.get);
router.post('/', usuarios_1.create);
router.put('/:id', usuarios_1.update);
exports.default = router;
//# sourceMappingURL=usuariosRoutes.js.map