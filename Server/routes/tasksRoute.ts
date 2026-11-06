import { Router } from 'express'
import controller from '../controllers/taskController.js'

const router = Router()

router.post('/createTask', controller.createTask)
router.get('/loadTasks/:id', controller.loadTasks)
router.patch('/changeStatus/:id', controller.changeStatus)
router.patch('/Update/:id', controller.updateTask)
router.delete('/removeTask/:id', controller.removeTask)

export default router
