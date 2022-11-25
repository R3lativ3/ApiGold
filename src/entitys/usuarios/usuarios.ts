export interface Usuario{
    id: number
    nombre: string
    email: string
    tipoUsuario: string
}

export interface UsuarioLogin{
    id: number
    nombre: string
    email: string
    tipoUsuario: string
    salt: string
    psw: string
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
    nombre: string          // listo
    email: string           // listo
    psw: string
    salt: string
    idTipoUsuario: number
}