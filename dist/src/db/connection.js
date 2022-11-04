"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionProperties_1 = require("./connectionProperties");
const db = new sequelize_1.Sequelize(connectionProperties_1.Conn.db, connectionProperties_1.Conn.username, connectionProperties_1.Conn.psw, {
    host: connectionProperties_1.Conn.host,
    dialect: 'mysql',
    logging: console.log
});
exports.default = db;
//# sourceMappingURL=connection.js.map