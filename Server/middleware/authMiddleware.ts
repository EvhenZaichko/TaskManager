import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
        req.userId = payload.id
        next()
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}