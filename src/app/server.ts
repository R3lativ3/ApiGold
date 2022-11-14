import 'reflect-metadata'
import express, { Application } from 'express'
import cors from 'cors'
import db from '../db/connection';
import RutasController from '../entitys/rutas/rutas.controller';
import { container } from 'tsyringe'
import PrestamosController from '../entitys/prestamos/prestamos.controller';
import CreditosController from '../entitys/creditos/creditos.controller';
import CobrosController from '../entitys/cobros/cobros.controller';
import CobradoresController from '../entitys/cobradores/cobradores.controller';
import ClientesController from '../entitys/clientes/clientes.controller';
import UsuariosController from '../entitys/usuarios/usuarios.controller';
import SedesController from '../entitys/sedes/sedes.controller';

class Server{

    private app: Application;
    private port: string
    private apiPaths = {
        usuarios: '/api/usuarios',
        sedes: '/api/sedes'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '80'
        console.log(this.port)
        this.databaseConnection()
        this.middlewares()
        this.routes()
    }
    
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    async databaseConnection(){
        try{
            await db.authenticate()
            console.log('online')
        }catch(error: any){
            throw new Error(error)
        }
    }

    routes(){
        const prestamos = container.resolve(PrestamosController)
        this.app.use(prestamos.routes())

        const rutas = container.resolve(RutasController)
        this.app.use(rutas.routes())
        
        const creditos = container.resolve(CreditosController)
        this.app.use(creditos.routes())
        
        const cobros = container.resolve(CobrosController)
        this.app.use(cobros.routes())
        
        const cobradores = container.resolve(CobradoresController)
        this.app.use(cobradores.routes())

        const clientes = container.resolve(ClientesController)
        this.app.use(clientes.routes())

        const usuarios = container.resolve(UsuariosController)
        this.app.use(usuarios.routes())

        const sedes = container.resolve(SedesController)
        this.app.use(sedes.routes())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('server running on port: '+ this.port)
        })
    }

}
export default Server;