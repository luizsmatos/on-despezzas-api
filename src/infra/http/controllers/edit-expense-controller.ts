import { Request, Response } from 'express'
import { z } from 'zod'

import { makeEditExpenseUseCase } from '@/domain/use-cases/factories/make-edit-expense-usecase'
import { ExpenseNotFoundError } from '@/domain/use-cases/errors/expense-not-found-error'

export async function editExpenseController(
  request: Request,
  response: Response,
): Promise<Response> {
  const editExpenseParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = editExpenseParamsSchema.parse(request.params)

  const editExpenseBodySchema = z.object({
    description: z.string().min(3).max(191),
    amount: z.number().positive(),
    date: z.coerce.date().refine((date) => date < new Date(), {
      message: 'Date must not be in the future',
    }),
  })

  const { description, amount, date } = editExpenseBodySchema.parse(
    request.body,
  )

  try {
    const editExpenseUseCase = makeEditExpenseUseCase()
    const result = await editExpenseUseCase.execute({
      customerId: request.customer.id,
      expenseId: id,
      description,
      amount,
      date,
    })

    const { expense } = result

    return response.status(201).json({ expense })
  } catch (err) {
    if (err instanceof ExpenseNotFoundError) {
      return response.status(404).json({ message: err.message })
    }

    throw err
  }
}
