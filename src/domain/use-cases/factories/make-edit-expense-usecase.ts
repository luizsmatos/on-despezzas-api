import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'

import { EditExpenseUseCase } from '../edit-expense'

export function makeEditExpenseUseCase(): EditExpenseUseCase {
  const expensesRepository = new PrismaExpensesRepository()

  const useCase = new EditExpenseUseCase(expensesRepository)

  return useCase
}
