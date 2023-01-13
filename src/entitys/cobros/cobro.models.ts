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

export interface CobroPorFecha{
    id: number
    idPrestamo: number
    cobro: number
    lat: string
    lon: string
    fecha: Date
    cliente: string
    montoConInteres: number
    plazoDias: number
    cobroDiario: number
    total: number
}

export interface CobroDetalle {
    id: number
    cobro: number
    fecha: Date
    lat: string
    lon: string
}

export interface CobroPorDia{
    total: number
    fecha: Date
}

export interface TotalCobroPorSemana{
    totalCobro: number
    totalPrestamo: number
    fecha: Date
}

export interface CobroDisponible{
    cobro: number
    cobroDiario: number
    direccion: string
    fechaPrestamo: Date
    fecha: Date
    idCobro: number
    idPrestamo: number
    montoConInteres: number
    nombre: string 
    total: number
    avanceEnDias: number
}