"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditosController_1 = require("../controllers/creditosController");
const router = (0, express_1.Router)();
router.get('/', creditosController_1.getAll);
router.get('/:id', creditosController_1.get);
router.post('/', creditosController_1.create);
router.put('/:id', creditosController_1.update);
exports.default = router;
//# sourceMappingURL=creditosRoutes.js.map