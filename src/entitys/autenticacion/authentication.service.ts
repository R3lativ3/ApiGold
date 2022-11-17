import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export default class Authentication{

    public signToken( id: string ){
        return jwt.sign({ id }, 'lel', {
            expiresIn: 60 * 60 * 24 * 365
        })
    }

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

    constructor(){
        const psw = this.signPsw('perromon')
        console.log('salt y encriptacion: ', psw)
        console.log('encryptado segun el salt generado anteriormente: ', this.encrypt(psw.salt, 'perromon'))
    }

}