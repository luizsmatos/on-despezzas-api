import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'

import { CreateExpenseUseCase } from '../create-expense'

export function makeCreateExpenseUseCase(): CreateExpenseUseCase {
  const expensesRepository = new PrismaExpensesRepository()

  const useCase = new CreateExpenseUseCase(expensesRepository)

  return useCase
}
