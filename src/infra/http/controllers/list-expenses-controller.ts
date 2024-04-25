import { Request, Response } from 'express'
import { z } from 'zod'

import { makeListExpensesUseCase } from '@/domain/use-cases/factories/make-list-expenses-usecase'

export async function listExpensesController(
  request: Request,
  response: Response,
): Promise<Response> {
  const listExpensesQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
  })

  const { page } = listExpensesQuerySchema.parse(request.query)

  const listExpensesUseCase = makeListExpensesUseCase()
  const result = await listExpensesUseCase.execute({
    customerId: request.customer.id,
    page,
  })

  const { expenses } = result

  return response.status(200).json({ expenses })
}
