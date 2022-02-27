"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('bapakqf1x9lue5zajbt6', 'ueksr5gb2ucn0psn', 'P7me8wfy5lb5FaUYcXW2', {
    host: 'bapakqf1x9lue5zajbt6-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    logging: console.log
});
exports.default = db;
//# sourceMappingURL=connection.js.map