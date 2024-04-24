import { Request, Response } from 'express'
import { z } from 'zod'

import { makeCreateExpenseUseCase } from '@/domain/use-cases/factories/make-create-expense-usecase'

export async function createExpenseController(
  request: Request,
  response: Response,
): Promise<Response> {
  const createExpenseBodySchema = z.object({
    description: z.string().min(3).max(191),
    amount: z.number().positive(),
    date: z.coerce.date().refine((date) => date < new Date(), {
      message: 'Date must not be in the future',
    }),
  })

  const { description, amount, date } = createExpenseBodySchema.parse(
    request.body,
  )

  const createExpenseUseCase = makeCreateExpenseUseCase()
  const result = await createExpenseUseCase.execute({
    customerId: request.customer.id,
    description,
    amount,
    date,
  })

  const { expense } = result

  return response.status(201).send({ expense })
}
