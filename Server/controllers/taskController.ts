import type { Request, Response } from 'express'
import Task from '../models/TaskModel.js'
import type { Priority, Status } from '../types/task.js'
import mongoose from 'mongoose'
import { STATUSES } from '../types/task.js'

type CreateTaskBody = {
    title: string
    priority?: Priority
    description?: string
    status?: Status
    project: string
}

type UpdateTaskBody = {
    title?: string
    description?: string
    priority?: Priority
    status?: Status
}


type TaskId = { id: string }
type ProjectId = {id: string}
type ChangeStatusBody = { status: Status }


class TaskController {

    async createTask(req: Request<{}, unknown, CreateTaskBody>, res: Response) {
        const {title, priority, description, status, project} = req.body
        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'title required' })
        }

        if(!mongoose.isValidObjectId(project)) {
            return res.status(400).json({ message: 'Invalid project id' })
        }

        try {
            const task = await Task.create({title, priority, description, status, project})
            return res.json(task)
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: e.message })
            }
            console.log('create task error', e)
            return res.status(500).json({ message: 'create task error' })
        }
    }

    async loadTasks(req: Request<ProjectId>, res: Response) {
        const {id} = req.params

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid project id' })
        }
        try {
            const tasks = await Task.find({project: id})

            return res.json(tasks)
        } catch (e) {
            console.log('load tasks error', e)
            return res.status(500).json({ message: 'load tasks error' })
        }
    }

    async changeStatus(req: Request<TaskId, unknown, ChangeStatusBody>, res: Response) {
        const {id} = req.params
        const {status} = req.body

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid task id' })
        }

        if(!status || !STATUSES.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        try {
            const task = await Task.findByIdAndUpdate(id, {status}, {new: true, runValidators: true})
            if(!task) {
                return res.status(400).json({message: 'task not found'})
            }

            return res.json(task)

        } catch (e) {
            console.log('change status error', e)
            return res.status(500).json({ message: 'change status error' })
        }
    }

    async updateTask(req: Request<TaskId, unknown, UpdateTaskBody>, res: Response) {
        const { id } = req.params
        const { title, description, priority, status } = req.body

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid task id' })
        }

        try {
            const task = await Task.findByIdAndUpdate(
                id, { title, description, priority, status }, { returnDocument: 'after', runValidators: true })

            if(!task) {
                return res.status(404).json({message: 'task not found'})
            }

            return res.json(task)

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: e.message })
            }
            console.error('updateTask error', e)
            return res.status(500).json({ message: 'updateTask error' })
        }
    }

    async removeTask(req: Request<TaskId>, res: Response) {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid task id' })
        }

        try {
            const result = await Task.deleteOne({ _id: id })

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'task not found' })
            }

            return res.json(id)
        } catch (e) {
            console.error('removeTask error', e)
            return res.status(500).json({ message: 'removeTask error' })
        }
    }
}

export default new TaskController()
