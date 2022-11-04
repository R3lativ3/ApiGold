import { Router } from 'express'
import { ObtenerTodos, create, update, ObtenerPrestamosPorRuta, GetAllByIdRuta } from '../controllers/rutasController'
import { ValidateCreate } from '../validators/rutas'
const router = Router()

router.get('/', ObtenerTodos)
router.get('/sede/:id', GetAllByIdRuta)
router.get('/:id/prestamos', ObtenerPrestamosPorRuta)
router.post('/', ValidateCreate, create)
router.put('/:id', update)

export default router