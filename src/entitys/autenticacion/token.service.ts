import jwt, { JwtPayload } from 'jsonwebtoken'
import crypto from 'crypto'

export default class TokenService{
    public encrypt(salt: string, psw: string){
        const key = crypto.pbkdf2Sync(psw, salt, 1000, 64, 'sha1')
        return key.toString('base64')
    }

    public signPsw(psw: string): {salt: string, key: string}{
        const salt = crypto.randomBytes(16).toString('base64')
        const encrypted = this.encrypt(salt, psw)
        console.log(encrypted)
        return {salt, key : encrypted}
    }

    async getToken(idUsuario: number, nombre: string, rol: string){
        const claims = { 
            id: idUsuario.toString(), 
            name: nombre, 
            rol
        }
        const token = jwt.sign( claims,  'jajajaja', {  expiresIn: '60 minute' })
        return token
    }

    validateToken(token: string){
        if(!token)
            return false

        const decoded = jwt.verify(token, 'jajajaja')
        return decoded?.length > 0
    }
}