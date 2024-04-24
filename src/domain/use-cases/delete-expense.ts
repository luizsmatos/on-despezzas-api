import { ExpensesRepository } from '@/domain/repositories/expenses-repository'

import { ExpenseNotFoundError } from './errors/expense-not-found-error'

interface DeleteExpenseUseCaseRequest {
  customerId: string
  expenseId: string
}

export class DeleteExpenseUseCase {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute({
    customerId,
    expenseId,
  }: DeleteExpenseUseCaseRequest): Promise<void> {
    const expense = await this.expensesRepository.findByCustomerId(
      customerId,
      expenseId,
    )

    if (!expense) {
      throw new ExpenseNotFoundError()
    }

    await this.expensesRepository.delete(expense)
  }
}
