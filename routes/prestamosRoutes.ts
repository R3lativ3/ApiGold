import { Router } from 'express'
import { getAll, get, create, update, getPrestamoDetail } from '../controllers/prestamos.controller'

const router = Router()

router.get('/', getAll)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)
router.get('/:id/detail', getPrestamoDetail)

export default router