import { PaginationParams } from '@/core/types/pagination-params'
import { Expense } from '@/domain/entities/expense'
import { ExpensesRepository } from '@/domain/repositories/expenses-repository'

import { PrismaExpenseMapper } from '../mappers/prisma-expense-mapper'
import { prisma } from '../prisma'

export class PrismaExpensesRepository implements ExpensesRepository {
  async findManyByCustomerId(
    customerId: string,
    { page }: PaginationParams,
  ): Promise<Expense[]> {
    const expenses = await prisma.expense.findMany({
      where: {
        customerId,
      },
      skip: page * 20,
      take: 20,
      orderBy: {
        date: 'desc',
      },
    })

    return expenses.map(PrismaExpenseMapper.toDomain)
  }

  async findByCustomerId(
    customerId: string,
    expenseId: string,
  ): Promise<Expense | null> {
    const expense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        customerId,
      },
    })

    if (!expense) {
      return null
    }

    return PrismaExpenseMapper.toDomain(expense)
  }

  async delete(expense: Expense): Promise<void> {
    await prisma.expense.delete({
      where: {
        id: expense.id,
      },
    })
  }

  async save(expense: Expense): Promise<void> {
    const prismaExpense = PrismaExpenseMapper.toPersistence(expense)

    await prisma.expense.update({
      where: {
        id: expense.id,
      },
      data: prismaExpense,
    })
  }

  async create(expense: Expense): Promise<void> {
    const prismaExpense = PrismaExpenseMapper.toPersistence(expense)

    await prisma.expense.create({
      data: prismaExpense,
    })
  }
}
