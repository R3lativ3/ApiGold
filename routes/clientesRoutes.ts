import { Router } from 'express'
import { getAll, get, create, update, getPrestamosByCliente } from '../controllers/clientes'

const router = Router()

router.get('/', getAll)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)

router.get('/:id/prestamos', getPrestamosByCliente)
export default router