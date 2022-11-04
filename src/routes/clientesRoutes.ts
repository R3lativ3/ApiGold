import { Router } from 'express'
import { getAll, get, create, update, getPrestamosByCliente } from '../controllers/clientesController'

const router = Router()

router.get('/', getAll)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)

router.get('/:id/prestamos', getPrestamosByCliente)
export default router