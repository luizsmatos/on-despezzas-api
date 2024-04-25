import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'
import { EtherealMailProvider } from '@/infra/providers/mail/ethereal/ethereal-mail-provider'

import { CreateExpenseUseCase } from '../create-expense'

export function makeCreateExpenseUseCase(): CreateExpenseUseCase {
  const expensesRepository = new PrismaExpensesRepository()
  const mailProvider = new EtherealMailProvider()

  const useCase = new CreateExpenseUseCase(expensesRepository, mailProvider)

  return useCase
}
