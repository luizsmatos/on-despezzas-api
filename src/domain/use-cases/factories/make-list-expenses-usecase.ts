import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'

import { ListExpensesUseCase } from '../list-expenses'

export function makeListExpensesUseCase(): ListExpensesUseCase {
  const expensesRepository = new PrismaExpensesRepository()

  const useCase = new ListExpensesUseCase(expensesRepository)

  return useCase
}
