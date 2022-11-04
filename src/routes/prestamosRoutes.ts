import { Router } from 'express'
import { getAll, get, create, update, getAllByRutaId } from '../controllers/prestamosController'

const router = Router()

router.get('/', getAll)
router.get('/ruta/:id', getAllByRutaId)
router.get('/:id', get)
router.post('/', create)
router.put('/:id', update)

export default router