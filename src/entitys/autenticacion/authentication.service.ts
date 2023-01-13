import jwt, { JwtPayload } from 'jsonwebtoken'
import crypto from 'crypto'
import { Loged, Login } from './autenticacion.models'
import { container } from 'tsyringe'
import UsuariosService from '../usuarios/usuarios.service'
import TokenService from './token.service'
import { NextFunction, Request, Response } from 'express'
export default class AuthenticacionService{

    constructor(){
    }

    async login(credentials: Login): Promise<Loged | null>{
        try{
            const usuarioService = container.resolve(UsuariosService)
            const user = await usuarioService.getUserByEmail(credentials.username)
            if(!user)
                return null
            
            const tokenService = container.resolve(TokenService)
            const enc = tokenService.decryptJs(user.psw)
            if(enc !== credentials.psw)
                return null

            let token = await tokenService.getToken(user.id, user.nombre, user.tipoUsuario)
            let response: Loged = { username: user.email, nombre: user.nombre, token }
            return response
        }
        catch(excepction){
            throw excepction
        }
    }

    public async isAuthenticated(req: Request, res: Response, next: NextFunction){
        const token = req.headers.authorization
        if(!token){
            return res.sendStatus(403)
        }
        const tokenService = container.resolve(TokenService)
        const validated = tokenService.validateToken(token)
        res.locals.user = validated
        return validated ? next() : res.sendStatus(403) 
    }
}