import { Response, StoreProcedureExecution } from '../../app/general';
import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Cobro, CobroDisponible, CobroPorDia, CobroPorFecha, CobroPost, CobroUpdate, TotalCobroPorSemana } from './cobro.models';
import PrestamosService from '../prestamos/prestamos.service';
import { container } from 'tsyringe';

class CobrosService {

    public async create(cobro: CobroPost): Promise<StoreProcedureExecution | null> {
        let query = 'CALL AgregarCobro(:idPrestamo, :cobro, :lat, :lon, now())'
        try{
            const replacements = {
                cobro: cobro.cobro,
                idPrestamo: cobro.idPrestamo,
                lat: cobro.lat,
                lon: cobro.lon
            }
            const resp = await db.query<StoreProcedureExecution>(query, { 
                replacements, 
                type:QueryTypes.SELECT,
                plain:true,
                mapToModel: true
            })
            return resp as StoreProcedureExecution
        }
        catch(exception: any){
            throw exception
        }
    }

    public async update(cobro: CobroUpdate, id: number): Promise<Response> {
        let query = `UPDATE CobroPrestamo set cobro = :cobro where id = :id`
        try{
            const resp = await db.query(query, { 
                replacements: {cobro: cobro.cobro, id},
                type: QueryTypes.UPDATE 
            })
            const [results, metadata] = resp
            return {success: true, message: `Cobro Actualizado, id: ${id}. Filas afectadas ${metadata}`}
        }
        catch(exception: any){
            throw exception
        }
    }

    public async getAll(): Promise<Cobro[]>{
        let query =  `
            select 
                a.idPrestamo,
                a.id, 
                a.cobro, 
                a.lat, 
                a.lon, 
                a.fecha,
                cli.nombre cliente,
                rut.nombreRuta ruta
            from CobroPrestamo a
            join Prestamo b on b.id = a.idPrestamo
            join Cliente cli on cli.id = b.idCliente
            join RutaCobrador ruc on b.idRutaCobrador = ruc.id
            join Ruta rut on ruc.idRuta = rut.id
        `
        try{
            const resp = await db.query<Cobro>(query, { type: QueryTypes.SELECT })
            return resp
        }
        catch(exception){
            throw exception
        }
    }

    public async getAllByDate(date: Date = new Date()){
        // variable: date se reemplaza en el query siguiente por :date
        let query = `
            select cobro.id, 
                cobro.idPrestamo, 
                cobro.cobro, 
                cobro.lat, 
                cobro.lon, 
                cobro.fecha, 
                cobro.cliente, 
                cobro.montoConInteres, 
                cobro.plazoDias, 
                cobro.cobroDiario, 
                total.total
            from(
                select cob.id, cob.idPrestamo, cob.cobro, cob.lat, cob.lon, cob.fecha, cli.nombre cliente, mon.montoConInteres, mon.plazoDias, mon.cobroDiario
                from CobroPrestamo cob
                join Prestamo pre on cob.idPrestamo = pre.id
                join RutaCobrador rut on rut.id = pre.idRutaCobrador and rut.id = 2
                join Cliente cli on pre.idCliente = cli.id
                join MontoPrestamo mon on pre.idMonto = mon.id
                where date(cob.fecha) = :date
            ) cobro
            left join (
                select idPrestamo, sum(cobro) total 
                from CobroPrestamo 
                where fecha < :date
                group by idPrestamo
            ) total on cobro.idPrestamo = total.idPrestamo
            order by fecha desc
        `
        try{
            const resp = await db.query<CobroPorFecha>(query, { replacements: { date }, type: QueryTypes.SELECT })
            return resp;
        }catch(exception) {
            throw exception;
        }
    }

    public async get(id: number): Promise<Cobro | null> {
        let query = `
            select
                a.idPrestamo,
                a.id, 
                a.cobro, 
                a.lat, 
                a.lon, 
                a.fecha,
                cli.nombre cliente,
                rut.nombreRuta ruta
            from CobroPrestamo a
            join Prestamo b on b.id = a.idPrestamo
            join Cliente cli on cli.id = b.idCliente
            join RutaCobrador ruc on b.idRutaCobrador = ruc.id
            join Ruta rut on ruc.idRuta = rut.id
            where a.id = :id
        `
        try{
            const resp = await db.query<Cobro>(query, { replacements: { id }, type: QueryTypes.SELECT, plain: true})
            return resp;
        }catch(exception) {
            throw exception;
        }
    }

    public getCurrentMonday(){
        const today = new Date();
        const first = today.getDate() - today.getDay() + 1;
      
        const monday = new Date(today.setDate(first));
        return monday
    }

    public async getTotalByDates(idRuta: number, start?: Date, end?: Date){
        let query = `
            select sum(cob.cobro) total, date(cob.fecha) fecha
            from CobroPrestamo cob
            join Prestamo pre on cob.idPrestamo = pre.id
            join RutaCobrador rut on rut.id = pre.idRutaCobrador and rut.id = :idRuta
            where cob.eliminado = 0 and date(cob.fecha) between  date(:fechaInicio) and date(:fechaFin)
            group by date(cob.fecha)
        `
        try{
            const resp = await db.query<CobroPorDia[]>(query, { 
                replacements: { 
                    fechaInicio : start, 
                    fechaFin : end, 
                    idRuta 
                }, 
                type: QueryTypes.SELECT
            })
            return resp;
        }catch(exception) {
            throw exception;
        }
    }

    public async getDisponiblesPorIdCobrador(idCobrador: number){
        let query = `
            select pre.id idPrestamo, cob.id idCobro, pre.fecha fechaPrestamo, cob.fecha, cli.nombre, cli.direccion, mon.cobroDiario, mon.montoConInteres, cob.cobro,
            total.total
            from Prestamo pre
            join RutaCobrador rc on rc.id = pre.idRutaCobrador
            join Cobrador co on co.id = rc.idCobrador
            join Cliente cli on cli.id = pre.idCliente
            join MontoPrestamo mon on mon.id = pre.idMonto
            left join CobroPrestamo cob on cob.idPrestamo = pre.id and date(cob.fecha) = date(now())
            left join (
                select idPrestamo, sum(cobro) total 
                from CobroPrestamo 
                group by idPrestamo
            ) total on pre.id = total.idPrestamo
            where co.id = :idCobrador and (total.total < mon.montoConInteres or total.total is null)
        `
        try{
            const resp = await db.query<CobroDisponible>(query, { 
                replacements: { idCobrador }, 
                type: QueryTypes.SELECT
            })
            const prestamoService = container.resolve(PrestamosService)
            resp.forEach(x => x.avanceEnDias = prestamoService.avanceEnDias(x.fechaPrestamo, new Date(), x.cobroDiario, x.montoConInteres, x.total))
            return resp;
        }catch(exception) {
            throw exception;
        }
    }

    public async getDisponiblesPorIdCobradorBusqueda(idCobrador: number, busqueda: string){
        let query = `
            select pre.id idPrestamo, cob.id idCobro, pre.fecha fechaPrestamo, cob.fecha, cli.nombre, cli.direccion, mon.cobroDiario, mon.montoConInteres, cob.cobro,
            total.total
            from Prestamo pre
            join RutaCobrador rc on rc.id = pre.idRutaCobrador
            join Cobrador co on co.id = rc.idCobrador
            join Cliente cli on cli.id = pre.idCliente
            join MontoPrestamo mon on mon.id = pre.idMonto
            left join CobroPrestamo cob on cob.idPrestamo = pre.id and date(cob.fecha) = date(now())
            left join (
                select idPrestamo, sum(cobro) total 
                from CobroPrestamo 
                group by idPrestamo
            ) total on pre.id = total.idPrestamo
            where co.id = :idCobrador and (total.total < mon.montoConInteres or total.total is null) and cli.nombre like :nombre
        `
        try{
            const resp = await db.query<CobroDisponible>(query, { 
                replacements: { idCobrador, nombre: `%${busqueda}%` }, 
                type: QueryTypes.SELECT
            })
            const prestamoService = container.resolve(PrestamosService)
            resp.forEach(x => x.avanceEnDias = prestamoService.avanceEnDias(x.fechaPrestamo, new Date(), x.cobroDiario, x.montoConInteres, x.total))
            return resp;
        }catch(exception) {
            throw exception;
        }
    }

    public async getTotalPorSemana(idCobrador: number){
        let queryMontoTotal = `
            select sum(a.cobro) totalCobro, sum(mon.montoConInteres) totalPrestamo, date(a.fecha) fecha
            from CobroPrestamo a
            join Prestamo b on a.idPrestamo = b.id
            join RutaCobrador c on c.id = b.idRutaCobrador and c.idCobrador = :idCobrador
            left join MontoPrestamo mon on b.idMonto = mon.id and yearweek(b.fecha) = yearweek(now())
            where yearweek(a.fecha) = yearweek(now()) and a.eliminado = false
            group by yearweek(a.fecha)
        `

        let queryDetalleMontoTotal = `
            select sum(a.cobro) totalCobro, sum(mon.montoConInteres) totalPrestamo, date(a.fecha) fecha
            from CobroPrestamo a
            join Prestamo b on a.idPrestamo = b.id
            join RutaCobrador c on c.id = b.idRutaCobrador and c.idCobrador = :idCobrador
            left join MontoPrestamo mon on b.idMonto = mon.id and yearweek(b.fecha) = yearweek(now())
            where yearweek(a.fecha) = yearweek(now()) and a.eliminado = false
            group by date(a.fecha)
            order by a.fecha desc
        `
        try{
            const total = await db.query<TotalCobroPorSemana>(queryMontoTotal, { 
                replacements: { idCobrador }, 
                type: QueryTypes.SELECT,
                plain: true
            })

            const detalle = await db.query<TotalCobroPorSemana>(queryDetalleMontoTotal, { 
                replacements: { idCobrador }, 
                type: QueryTypes.SELECT
            })
            return {total, detalle};
        }catch(exception) {
            throw exception;
        }
    }

}

export default CobrosService