import type { Request, Response } from 'express'
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


type RegistrationBody = {
    email: string
    password: string
    username: string
}

type LoginBody = {
    email: string
    password: string
}

type Username = {
    username: string
}

const createToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: '1d'})

}

class UserController {
    async registration(req: Request<{}, unknown, RegistrationBody>, res: Response) {
        const {email, password, username} = req.body

        if(!username?.trim() || !email?.trim() || !password) {
            return res.status(400).json({message: 'all fields required'})
        }

        try {
            const exists = await User.findOne({email: email.toLocaleLowerCase().trim()})

            if(exists) {
                return res.status(409).json({message: 'Email already is use'})
            }

            const hash = await bcrypt.hash(password, 10)
            const user = await User.create({username, email, password: hash})

            return res.status(201).json({ token: createToken(user.id), user })

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: e.message })
            }
            if (e instanceof mongoose.mongo.MongoServerError && e.code === 11000) {
                return res.status(409).json({ message: 'Email already in use' })
            }
            console.error('registration error', e)
            return res.status(500).json({ message: 'registration error' })
        }

    }

    async login(req: Request<{}, unknown, LoginBody>, res: Response) {
        const {email, password} = req.body

        if(!email.trim() || !password.trim()) {
            return res.status(400).json({message: 'all fields required'})
        }

        try {
            const user = await User.findOne({email: email.toLocaleLowerCase().trim()}).select('+password')

            if(!user) {
                return res.status(400).json({message: 'user not found'})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return  res.status(400).json({message: 'wrong password'})
            }

            const token = createToken(user.id)

            return res.json({
                user: user,
                token: token
            })

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'login error'})
        }

    }

    async me(req: Request, res: Response) {
        try {
            const user = await User.findById(req.userId)
            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }

            return res.json(user)

        } catch (e) {
            console.error('me error', e)
            return res.status(500).json({ message: 'me error' })
        }
    }

    async updateUsername(req: Request<{}, unknown, Username>, res: Response) {
        const {username} = req.body

        if(!username.trim()) {
            return res.status(400).json({message: 'username can not be empty'})
        }

        try {
            const user = await User.findByIdAndUpdate(
                req.userId,
                { username },
                { returnDocument: 'after', runValidators: true },
            )

            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }

            return res.json(user)

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: e.message })
            }
            console.error('updateProfile error', e)
            return res.status(500).json({ message: 'updateProfile error' })
        }
    }
}

export default new UserController()
