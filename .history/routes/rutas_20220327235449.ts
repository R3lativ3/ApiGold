import { Router } from 'express'
import { getAll, create, update, PrestamosPorRuta } from '../controllers/rutas.controller'

const router = Router()

router.get('/', getAll)
router.get('/:id/prestamos', PrestamosPorRuta)
router.post('/', create)
router.put('/:id', update)

export default router