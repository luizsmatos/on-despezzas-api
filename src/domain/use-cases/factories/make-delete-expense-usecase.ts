import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'

import { DeleteExpenseUseCase } from '../delete-expense'

export function makeDeleteExpenseUseCase(): DeleteExpenseUseCase {
  const expensesRepository = new PrismaExpensesRepository()

  const useCase = new DeleteExpenseUseCase(expensesRepository)

  return useCase
}
