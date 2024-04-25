import { PrismaExpensesRepository } from '@/infra/database/prisma/repositories/prisma-expenses-repository'
import { EtherealMailProvider } from '@/infra/providers/mail/ethereal/ethereal-mail-provider'

import { CreateExpenseUseCase } from '../create-expense'
import { env } from '@/infra/config/env'
import { InMemoryMailProvider } from 'tests/providers/in-memory-mail-provider'

export function makeCreateExpenseUseCase(): CreateExpenseUseCase {
  const expensesRepository = new PrismaExpensesRepository()
  const mailProvider =
    env.NODE_ENV !== 'testing'
      ? new EtherealMailProvider()
      : new InMemoryMailProvider()

  const useCase = new CreateExpenseUseCase(expensesRepository, mailProvider)

  return useCase
}
