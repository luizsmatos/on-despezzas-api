import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/infra/config/env'
import { PrismaCustomersRepository } from '@/infra/database/prisma/repositories/prisma-customers-repository'

export async function verifyJwtMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const [, token] = authHeader.split(' ')

    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string }

    const customersRepository = new PrismaCustomersRepository()
    const customer = await customersRepository.findById(decoded.sub)

    if (!customer) {
      return response.status(401).json({ message: 'Customer not found' })
    }

    request.customer = customer

    next()
  } catch (err) {
    return response.status(401).json({ message: 'Unauthorized' })
  }
}
