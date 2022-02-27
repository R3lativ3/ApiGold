import { DataTypes } from 'sequelize'
import db from '../db/connection'

export const Cliente = db.define('Cliente',{
    id: {
        field:'id',
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombres: {
        field:'nombres',
        type: DataTypes.STRING
    }  
})