"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobrosController_1 = require("../controllers/cobrosController");
const router = (0, express_1.Router)();
router.get('/', cobrosController_1.getAll);
router.get('/:id', cobrosController_1.get);
router.post('/', cobrosController_1.create);
router.put('/:id', cobrosController_1.update);
exports.default = router;
//# sourceMappingURL=cobrosRoutes.js.map