"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditos_1 = require("../controllers/creditos");
const router = (0, express_1.Router)();
router.get('/', creditos_1.getAll);
router.get('/:id', creditos_1.get);
router.post('/', creditos_1.create);
router.put('/:id', creditos_1.update);
exports.default = router;
//# sourceMappingURL=creditosRoutes.js.map