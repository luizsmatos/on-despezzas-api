import { Expense } from '@/entities/expense'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { PaginationParams } from '@/repositories/types/pagination-params'

export class InMemoryExpensesRepository implements ExpensesRepository {
  public items: Expense[] = []

  async findManyByCustomerId(
    customerId: string,
    { page }: PaginationParams,
  ): Promise<Expense[]> {
    const expenses = this.items
      .filter((item) => item.customerId === customerId)
      .slice((page - 1) * 20, page * 20)

    return expenses
  }

  async findByCustomerId(
    customerId: string,
    expenseId: string,
  ): Promise<Expense | null> {
    const expense = this.items.find(
      (item) => item.customerId === customerId && item.id === expenseId,
    )

    return expense ?? null
  }

  async save(expense: Expense): Promise<void> {
    const index = this.items.findIndex((item) => item.id === expense.id)

    this.items[index] = expense
  }

  async delete(expense: Expense): Promise<void> {
    this.items = this.items.filter((item) => item.id !== expense.id)
  }

  async create(expense: Expense): Promise<void> {
    this.items.push(expense)
  }
}
