import {Router} from "express";

import controller from '../controllers/projectController.js'

const router = Router()

router.post('/createProject', controller.createProject)
router.get('/loadProjects', controller.loadProjects)
router.delete('/removeProject/:id', controller.removeProject)


export default router