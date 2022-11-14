"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditos_controller_1 = require("../entitys/creditos/creditos.controller");
const router = (0, express_1.Router)();
router.get('/', creditos_controller_1.getAll);
router.get('/:id', creditos_controller_1.get);
router.post('/', creditos_controller_1.create);
router.put('/:id', creditos_controller_1.update);
exports.default = router;
//# sourceMappingURL=creditos.route.js.map