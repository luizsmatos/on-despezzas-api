import { Expense } from '@/entities/expense'
import { ExpensesRepository } from '@/repositories/expenses-repository'

import { ExpenseNotFoundError } from './errors/expense-not-found-error'

interface GetExpenseUseCaseRequest {
  customerId: string
  expenseId: string
}

interface GetExpenseUseCaseResponse {
  expense: Expense
}

export class GetExpenseUseCase {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute({
    customerId,
    expenseId,
  }: GetExpenseUseCaseRequest): Promise<GetExpenseUseCaseResponse> {
    const expense = await this.expensesRepository.findByCustomerId(
      customerId,
      expenseId,
    )

    if (!expense) {
      throw new ExpenseNotFoundError()
    }

    return {
      expense,
    }
  }
}
