"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Cliente = connection_1.default.define('Cliente', {
    id: {
        field: 'id',
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombres: {
        field: 'nombres',
        type: sequelize_1.DataTypes.STRING
    }
});
//# sourceMappingURL=cliente.js.map