import { CobroDetalle } from "../cobros/cobro"

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