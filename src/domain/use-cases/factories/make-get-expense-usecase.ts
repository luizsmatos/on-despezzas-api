import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'

import { GetExpenseUseCase } from '../get-expense'

export function makeGetExpenseUseCase(): GetExpenseUseCase {
  const expensesRepository = new PrismaExpensesRepository()

  const useCase = new GetExpenseUseCase(expensesRepository)

  return useCase
}
