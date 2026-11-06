import type { Request, Response } from 'express'
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

type RegistrationBody = {
    email: string
    password: string
    username: string
}

class UserController {
    async registration(req: Request<{}, unknown, RegistrationBody>, res: Response) {
        const {email, password, username} = req.body


    }
}

export default new UserController()
