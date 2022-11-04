import { Router } from 'express'
import { getAll, get, create, update, getClientes } from '../controllers/cobradoresController'

const router = Router()

router.get('/', getAll)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)
router.get('/:id/clientes', getClientes)

export default router