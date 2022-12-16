import { Response } from '../../app/general';
import db from "../../db/connection"
import { QueryTypes } from 'sequelize'
import { Cobro, CobroDisponible, CobroPorDia, CobroPorFecha, CobroPost, CobroUpdate } from './cobro.models';

class CobrosService {

    public async create(cobro: CobroPost): Promise<Response> {
        let query = `
            INSERT INTO CobroPrestamo (cobro, idPrestamo, lat, lon, fecha)
            VALUES (:cobro, :idPrestamo, :lat, :lon, now())
        `
        try{
            const resp = await db.query(query, { 
                replacements: { 
                    cobro: cobro.cobro,
                    idPrestamo: cobro.idPrestamo,
                    lat: cobro.lat,
                    lon: cobro.lon
                },
                type: QueryTypes.INSERT 
            })
            const [results, metadata] = resp

            return { success: true, message: `Cobro Regitrado: ${results}, filas afectadas: ${metadata}`}
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
            select pre.id idPrestamo, cob.id idCobro, cob.fecha, cli.nombre, cli.direccion, mon.cobroDiario, mon.montoConInteres, cob.cobro,
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
            where co.id = :idCobrador and total.total < mon.montoConInteres
        `
        try{
            const resp = await db.query<CobroDisponible>(query, { 
                replacements: { idCobrador }, 
                type: QueryTypes.SELECT
            })
            return resp;
        }catch(exception) {
            throw exception;
        }
    }
            

}

export default CobrosService