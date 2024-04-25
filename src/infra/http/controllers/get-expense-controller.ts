import { Request, Response } from 'express'
import { z } from 'zod'

import { makeGetExpenseUseCase } from '@/domain/use-cases/factories/make-get-expense-usecase'
import { ExpenseNotFoundError } from '@/domain/use-cases/errors/expense-not-found-error'

export async function getExpenseController(
  request: Request,
  response: Response,
): Promise<Response> {
  const getExpenseParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getExpenseParamsSchema.parse(request.params)

  try {
    const getExpenseUseCase = makeGetExpenseUseCase()
    const result = await getExpenseUseCase.execute({
      customerId: request.customer.id,
      expenseId: id,
    })

    const { expense } = result

    return response.status(200).json({ expense })
  } catch (err) {
    if (err instanceof ExpenseNotFoundError) {
      return response.status(404).json({ message: err.message })
    }

    throw err
  }
}
