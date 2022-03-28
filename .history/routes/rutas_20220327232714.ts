import { Router } from 'express'
import { getAll, create, update } from '../controllers/rutas.controller'

const router = Router()

router.get('/', getAll)
router.post('/', create)
router.put('/:id', update)

export default router