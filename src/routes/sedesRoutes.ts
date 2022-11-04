import { Router } from 'express'
import { getAll } from '../controllers/sedesController'

const router = Router()

router.get('/', getAll)

export default router