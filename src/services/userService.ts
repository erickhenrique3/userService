import { prisma } from '../db/prismaClient'
import bcrypt from 'bcryptjs'

export const userService = {
  async createUser(name: string, phone : string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, phone, email, password: hashed }
    })
    return { id: user.id, email: user.email, createdAt: user.createdAt }
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async findByPhone(phone: string) {
    return prisma.user.findUnique({ where: { phone } })
  },

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } })
  },

  async verifyPassword(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed)
  }
}
