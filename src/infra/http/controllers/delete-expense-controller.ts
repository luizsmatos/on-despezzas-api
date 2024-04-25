import { Request, Response } from 'express'
import { z } from 'zod'

import { makeDeleteExpenseUseCase } from '@/domain/use-cases/factories/make-delete-expense-usecase'
import { ExpenseNotFoundError } from '@/domain/use-cases/errors/expense-not-found-error'

export async function deleteExpenseController(
  request: Request,
  response: Response,
): Promise<Response> {
  const deleteExpenseParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteExpenseParamsSchema.parse(request.params)

  try {
    const deleteExpenseUseCase = makeDeleteExpenseUseCase()
    await deleteExpenseUseCase.execute({
      customerId: request.customer.id,
      expenseId: id,
    })

    return response.status(204).send()
  } catch (err) {
    if (err instanceof ExpenseNotFoundError) {
      return response.status(404).json({ message: err.message })
    }

    throw err
  }
}
