import { Expense as PrismaExpense, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { Expense } from '@/domain/entities/expense'

export class PrismaExpenseMapper {
  static toPersistence(expense: Expense): Prisma.ExpenseUncheckedCreateInput {
    return {
      id: expense.id,
      description: expense.description,
      amount: new Decimal(expense.amount).toNumber(),
      date: expense.date,
      customerId: expense.customerId,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt ?? undefined,
    }
  }

  static toDomain(raw: PrismaExpense): Expense {
    return Expense.create(
      {
        description: raw.description,
        amount: new Decimal(raw.amount).toNumber(),
        date: raw.date,
        customerId: raw.customerId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
}
