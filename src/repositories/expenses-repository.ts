import { Expense } from '@/entities/expense'
import { PaginationParams } from './types/pagination-params'

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
