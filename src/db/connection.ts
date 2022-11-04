import { Sequelize } from 'sequelize'
import { Conn } from './connectionProperties'

const db = new Sequelize(Conn.db, Conn.username, Conn.psw, {
    host: Conn.host,
    dialect: 'mysql',
    logging: console.log
})

export default db