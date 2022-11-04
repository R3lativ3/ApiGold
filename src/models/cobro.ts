export interface cobroPost{
    cobro: number
    idPrestamo: number
    lat: number
    lon: number
}

export interface cobroUpdate{
    cobro: number
}

export interface cobro{
    idPrestamo: number
    id: number
    cobro: number
    lat: number 
    lon: number
    fecha: Date
    cliente: string 
    ruta: string
}