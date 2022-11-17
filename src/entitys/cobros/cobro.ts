export interface CobroPost{
    cobro: number
    idPrestamo: number
    lat: number
    lon: number
}

export interface CobroUpdate{
    cobro: number
}

export interface Cobro{
    idPrestamo: number
    id: number
    cobro: number
    lat: number 
    lon: number
    fecha: Date
    cliente: string 
    ruta: string
}


export interface CobroDetalle {
    id: number
    cobro: number
    fecha: Date
    lat: string
    lon: string
}