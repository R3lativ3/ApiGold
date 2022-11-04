
export interface prestamos{
    id: number,
    fecha: Date
    activo: boolean
    entregaEfectivo: boolean
    cliente: string
    ruta: string
    cobrador: string
    digitador: string
    tipo: string
    montoEntregado: number
    montoConInteres: number
    porcentajeInteres: number
    plazoDias: string
    cuota: number
    pagado: number
    porcentaje: number
    cobroEnDias: number
}

export interface prestamoCreate{
    fecha: Date,
    idRutaCobrador: number,
    idUsuario: number,
    idCliente: number,
    idTipoPrestamo: number,
    idMonto: number,
    entregaEfectivo: boolean
}