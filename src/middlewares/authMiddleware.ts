import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { prisma } from '../db/prismaClient'
import { config } from 'dotenv'
import { error, notFound } from '../utils/response'

config()
const JWT_SECRET = process.env.JWT_SECRET!

export async function authMiddleware(ctx: Context, next: Next) {
  const auth = ctx.headers['authorization']
  if (!auth) return error(ctx, 'Token missing', 401)

  const parts = String(auth).split(' ')
  const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null
  if (!token) return error(ctx, 'Invalid authorization header', 401)

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string }
    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (!user) return notFound(ctx, 'User not found')

    ctx.state.user = { id: user.id, email: user.email }
    await next()
  } catch (err) {
    return error(ctx, 'Invalid token', 401)
  }
}
