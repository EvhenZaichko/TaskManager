import Project from '../models/ProjectModel.js'
import type { Request, Response } from 'express'
import mongoose from "mongoose";
import Task from '../models/TaskModel.js'

type CreateProjectBody = {
    title: string
}

type ProjectId = {id: string}

class ProjectController {

    async createProject  (req: Request<{}, unknown, CreateProjectBody>, res: Response) {
        const {title} = req.body

        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'title required' })
        }


        try {
            const project = await Project.create({title})

            return res.json(project)
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: e.message })
            }
            console.log('create project error', e)
            return res.status(500).json({ message: 'create project error' })
        }
}

    async loadProjects (req: Request<{}>, res: Response) {
        try {
            const projects = await Project.find()

            return res.json(projects)
        } catch (e) {
            console.log('load projects error', e)
            return res.status(500).json({ message: 'load projects error' })
        }
    }

    async removeProject(req: Request<ProjectId>, res: Response) {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid project id' })
        }

        try {
            const result = await Project.deleteOne({ _id: id })

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Project not found' })
            }

            await Task.deleteMany({ project: id })

            return res.json(id)
        } catch (e) {
            console.error('removeProject error', e)
            return res.status(500).json({ message: 'removeProject error' })
        }
    }

}

export default new ProjectController()