import express, { Application } from 'express'
import cors from 'cors'
import db from '../db/connection';
import prestamosRoutes from '../routes/prestamosRoutes'
import clientesRoutes from '../routes/clientesRoutes'
import cobradoresRoutes from '../routes/cobradoresRoutes'
import cobrosRoutes from '../routes/cobrosRoutes'
import creditosRoutes from '../routes/creditosRoutes'
import rutasRoutes from '../routes/rutasRoutes'
import usuariosRoutes from '../routes/usuariosRoutes'

class Server{
    
    private app: Application;
    private port: string
    private apiPaths = {
        prestamos: '/api/prestamos',
        clientes: '/api/clientes',
        cobradores: '/api/cobradores',
        cobros: '/api/cobros',
        creditos: '/api/creditos',
        rutas: '/api/rutas',
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000' 
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
        this.app.use( this.apiPaths.prestamos, prestamosRoutes )
        this.app.use( this.apiPaths.clientes, clientesRoutes )
        this.app.use( this.apiPaths.cobradores, cobradoresRoutes )
        this.app.use( this.apiPaths.cobros, cobrosRoutes )
        this.app.use( this.apiPaths.creditos, creditosRoutes )
        this.app.use( this.apiPaths.rutas, rutasRoutes )
        this.app.use( this.apiPaths.usuarios, usuariosRoutes )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('server running on port: '+ this.port)
        })
    }

}
export default Server;