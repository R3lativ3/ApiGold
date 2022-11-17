export interface Cliente{
    id: number
    nombre: string
    dpi: string
    telefono: string
    telefono2: string
    ocupacion: string
    negocio: string
    foto: string
    fotoCasa: string
    direccion: string
    nit: string
    referencia: string
    creado: Date
}

export interface CreateCliente{
    nombre: string
    dpi: string
    telefono: string
    telefono2: string
    ocupacion: string
    negocio: string
    foto?: File
    fotoCasa?: File
    direccion: string
    nit: string
    referencia: string
}

export interface PrestamoCliente{
    idCliente: number
    idPrestamo: number
    idRutaCobrador: number
    fechaPrestamo: Date
    nombre: string
    dpi: string
    telefono: string
    direccion: string
    cobrador: string
    nombreRuta: string
    montoEntregado: number
    montoConInteres: number
    plazoDias: number
}