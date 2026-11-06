import { Schema, model, type Types } from 'mongoose'
import { PRIORITIES, STATUSES, type Priority, type Status } from '../types/task.js'

export interface ITask {
    title: string
    description: string
    status: Status
    priority: Priority
    project: Types.ObjectId
    assignee: Types.ObjectId | null
    createdAt: Date
    updatedAt: Date
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        status: { type: String, enum: STATUSES, default: 'backlog' },
        priority: { type: String, enum: PRIORITIES, default: 'Medium' },
        assignee: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    },
    { timestamps: true },
)

taskSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const { _id, ...rest } = ret
        return rest
    },
})

const TaskModel = model<ITask>('Task', taskSchema)

export default TaskModel
