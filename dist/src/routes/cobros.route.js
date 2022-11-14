"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobros_controller_1 = require("../entitys/cobros/cobros.controller");
const router = (0, express_1.Router)();
router.get('/', cobros_controller_1.getAll);
router.get('/:id', cobros_controller_1.get);
router.post('/', cobros_controller_1.create);
router.put('/:id', cobros_controller_1.update);
exports.default = router;
//# sourceMappingURL=cobros.route.js.map