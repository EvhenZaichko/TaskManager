import { Schema, model } from 'mongoose'

export interface IUser {
    username: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
)


userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const { _id, password, ...rest } = ret
        return rest
    },
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
