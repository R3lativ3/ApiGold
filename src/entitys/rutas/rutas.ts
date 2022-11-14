export interface Ruta{
    id: number
    nombreRuta: string
    sede: string
    municipio: string
    nombres: string
    apellidos: string
    cantidadClientes: number
    capital: number
    capitalGanancia: number
    cobroDiario: number
}

export interface CreateRuta{
    nombreRuta: string
    idSede: number
    idMunicipio: number
}
