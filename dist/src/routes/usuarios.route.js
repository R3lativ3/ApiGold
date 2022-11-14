"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../entitys/usuarios/usuarios.controller");
const router = (0, express_1.Router)();
router.get('/', usuarios_controller_1.getAll);
router.get('/:id', usuarios_controller_1.get);
router.post('/', usuarios_controller_1.create);
router.put('/:id', usuarios_controller_1.update);
exports.default = router;
//# sourceMappingURL=usuarios.route.js.map