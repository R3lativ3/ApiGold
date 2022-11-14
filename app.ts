import dotenv from 'dotenv'
import Server from './src/app/server'

dotenv.config()

const server = new Server()

server.listen()