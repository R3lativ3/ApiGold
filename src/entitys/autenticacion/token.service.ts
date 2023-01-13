import jwt, { JwtPayload } from 'jsonwebtoken'
import crypto from 'crypto'
import CryptoJS from 'crypto-js'
export default class TokenService{

    public encryptJs(psw: string){
        return CryptoJS.AES.encrypt(psw, 'perromon').toString()
    }

    public decryptJs(encrypt: string){
        const bytes = CryptoJS.AES.decrypt(encrypt, 'perromon')
        const text = bytes.toString(CryptoJS.enc.Utf8)
        return text
    }

    async getToken(idUsuario: number, nombre: string, rol: string){
        const claims = { 
            id: idUsuario.toString(), 
            name: nombre, 
            rol
        }
        const token = jwt.sign(claims,  'jajajaja', {  expiresIn: '1 year' })
        return token
    }

    validateToken(token: string){
        if(!token)
            return ""

        const decoded = jwt.verify(token, 'jajajaja')
        return decoded
    }
}