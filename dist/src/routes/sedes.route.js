"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sedes_controller_1 = require("../entitys/sedes/sedes.controller");
const router = (0, express_1.Router)();
router.get('/', sedes_controller_1.getAll);
exports.default = router;
//# sourceMappingURL=sedes.route.js.map