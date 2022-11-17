export interface Cobrador{
    id: number
    nombres: string
    apellidos: string
    dpi: string
    telefono: string
    nombreRuta: string
    sede: string
}

export interface CreateCobrador{
    nombres: string
    apellidos: string
    dpi: string
    telefono: string
    idUsuario: number
}