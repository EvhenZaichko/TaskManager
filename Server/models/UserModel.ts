import { Schema, model } from 'mongoose'

export interface IUser {
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    },
    { timestamps: true },
)

// отдаём на фронт id вместо _id и без служебного __v
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const { _id, ...rest } = ret
        return rest
    },
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
