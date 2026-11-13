import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import controller from "../controllers/userController.js";


const router = Router()

router.post('/registration', controller.registration)
router.get('/me', authMiddleware, controller.me)
router.post('/login', controller.login)
router.patch('/updateUsername', authMiddleware, controller.updateUsername)

export default router
