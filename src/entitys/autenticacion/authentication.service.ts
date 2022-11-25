import jwt, { JwtPayload } from 'jsonwebtoken'
import crypto from 'crypto'
import { Loged, Login } from './autenticacion.models'
import { container } from 'tsyringe'
import UsuariosService from '../usuarios/usuarios.service'
import TokenService from './token.service'
export default class AuthenticacionService{

    async login(credentials: Login): Promise<Loged | null>{
        try{
            const usuarioService = container.resolve(UsuariosService)
            const user = await usuarioService.getUserByEmail(credentials.username)
            if(!user)
                return null
            
            const tokenService = container.resolve(TokenService)
            const encrypted = tokenService.encrypt(credentials.psw, user.salt)

            if(encrypted !== user.psw)
                return null

            let token = await tokenService.getToken(user.id, user.nombre, user.tipoUsuario)
            let response: Loged = { username: user.email, nombre: user.nombre, token }
            return response
        }
        catch(excepction){
            throw excepction
        }
    }

    constructor(){
    }

}