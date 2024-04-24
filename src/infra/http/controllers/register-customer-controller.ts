import { Request, Response } from 'express'
import { makeRegisterCustomerUseCase } from '@/domain/use-cases/factories/make-register-customer-usecase'
import z from 'zod'
import { CustomerAlreadyExistsError } from '@/domain/use-cases/errors/customer-already-exists-error'

export async function registerCustomerController(
  request: Request,
  response: Response,
): Promise<Response> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerCustomerUseCase = makeRegisterCustomerUseCase()
    await registerCustomerUseCase.execute({
      name,
      email,
      password,
    })

    return response.status(201).send()
  } catch (err) {
    if (err instanceof CustomerAlreadyExistsError) {
      return response.status(409).json({ message: err.message })
    }

    throw err
  }
}
