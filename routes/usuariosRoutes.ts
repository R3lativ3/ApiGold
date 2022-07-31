import { Router } from 'express'
import { getAll, get, create, update } from '../controllers/usuariosController'

const router = Router()

router.get('/', getAll)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)

export default router