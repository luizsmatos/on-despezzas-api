import { PaginationParams } from '@/core/types/pagination-params'
import { Expense } from '@/domain/entities/expense'

export interface ExpensesRepository {
  findManyByCustomerId(
    customerId: string,
    params: PaginationParams,
  ): Promise<Expense[]>
  findByCustomerId(
    customerId: string,
    expenseId: string,
  ): Promise<Expense | null>
  delete(expense: Expense): Promise<void>
  save(expense: Expense): Promise<void>
  create(expense: Expense): Promise<void>
}
