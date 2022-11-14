export interface Usuario{
    id: number
    nombre: string
    email: string
    tipoUsuario: string
}

export interface UsuarioInternal{
    id: number
    nombre: string
    email: string
    psw: string
    idTipoUsuario: number
    salt: string
}

export interface CreateUsuario{
    nombre: string
    email: string
    psw: string
    salt: string
    idTipoUsuario: number
}