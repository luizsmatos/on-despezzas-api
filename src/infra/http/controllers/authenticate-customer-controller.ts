import { Request, Response } from 'express'
import { z } from 'zod'

import { WrongCredentialsError } from '@/domain/use-cases/errors/wrong-credentials-error'
import { makeAuthenticateCustomerUseCase } from '@/domain/use-cases/factories/make-authenticate-customer-usecase'

export async function authenticateCustomerController(
  request: Request,
  response: Response,
): Promise<Response> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateCustomerUseCase = makeAuthenticateCustomerUseCase()
    const result = await authenticateCustomerUseCase.execute({
      email,
      password,
    })

    const { accessToken } = result

    return response.status(200).send({ accessToken })
  } catch (err) {
    if (err instanceof WrongCredentialsError) {
      return response.status(400).json({ message: err.message })
    }

    throw err
  }
}
