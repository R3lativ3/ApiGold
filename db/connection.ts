import { Sequelize } from 'sequelize'

const db = new Sequelize('bapakqf1x9lue5zajbt6','ueksr5gb2ucn0psn', 'P7me8wfy5lb5FaUYcXW2', {
    host: 'bapakqf1x9lue5zajbt6-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    logging: console.log
})

export default db