"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sedesController_1 = require("../controllers/sedesController");
const router = (0, express_1.Router)();
router.get('/', sedesController_1.getAll);
exports.default = router;
//# sourceMappingURL=sedesRoutes.js.map