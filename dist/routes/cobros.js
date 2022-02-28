"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobros_1 = require("../controllers/cobros");
const router = (0, express_1.Router)();
router.get('/', cobros_1.getAll);
router.get('/:id', cobros_1.get);
router.post('/', cobros_1.create);
router.put('/:id', cobros_1.update);
exports.default = router;
//# sourceMappingURL=cobros.js.map