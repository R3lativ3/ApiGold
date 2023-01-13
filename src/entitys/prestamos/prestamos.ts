import { CobroDetalle } from "../cobros/cobro.models"

export interface Prestamo{
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

export interface PrestamoCompletado{
    id: number,
    fecha: Date
    fechaFin: Date
    entregaEfectivo: boolean
    ultimoCobro: number
    idCliente: number 
    nombre: string
    direccion: string
    cobroDiario: number
    montoConInteres: number
    montoEntregado: number
    porcentajeInteres: number
    plazoDias: string
}

export interface PrestamoCreate{
    fecha: Date,
    idRutaCobrador: number
    idUsuario: number
    idCliente: number
    idTipoPrestamo: number
    idMonto: number
    entregaEfectivo: boolean
}

export interface PrestamoUpdate{
    fecha: Date
    idRutaCobrador: number
    idCliente: number
    idMonto: number
    entregaEfectivo: boolean
}

export interface PrestamoDetail {
    prestamo: Prestamo
    detalle: CobroDetalle[]
}

export interface PrestamoRuta{
    id: number
    fecha: string
    montoEntregado: number
    montoConInteres: number
    cobroDiario: number
    cliente: string
    totalCobrado: number
}

export interface PrestamoPorCobrador{
    id: number
    fechaEntrega: Date
    cliente: string
    montoEntregado: number
    plazoDias: number
    montoConInteres: number
}