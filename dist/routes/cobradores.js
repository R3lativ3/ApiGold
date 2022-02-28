"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobradores_1 = require("../controllers/cobradores");
const router = (0, express_1.Router)();
router.get('/', cobradores_1.getAll);
router.get('/:id', cobradores_1.get);
router.post('/', cobradores_1.create);
router.put('/:id', cobradores_1.update);
exports.default = router;
//# sourceMappingURL=cobradores.js.map