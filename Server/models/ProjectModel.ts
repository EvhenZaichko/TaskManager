import { Schema, model } from 'mongoose'

export interface IProject {
    title: string
    key: string
    description: string
    createdAt: Date
    updatedAt: Date
}

const projectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
    },
    { timestamps: true },
)

projectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const { _id, ...rest } = ret
        return rest
    },
})

const ProjectModel = model<IProject>('Project', projectSchema)

export default ProjectModel