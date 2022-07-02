import { Router } from 'express'
import { ObtenerTodos, create, update, ObtenerPrestamosPorRuta } from '../controllers/rutas.controller'

const router = Router()

router.get('/', ObtenerTodos)
router.get('/:id/prestamos', ObtenerPrestamosPorRuta)
router.post('/', create)
router.put('/:id', update)

export default router