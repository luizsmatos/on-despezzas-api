import { Expense } from '@/domain/entities/expense'
import { ExpensesRepository } from '@/domain/repositories/expenses-repository'

import { ExpenseNotFoundError } from './errors/expense-not-found-error'

interface EditExpenseUseCaseRequest {
  customerId: string
  expenseId: string
  description: string
  amount: number
  date: Date
}

interface EditExpenseUseCaseResponse {
  expense: Expense
}

export class EditExpenseUseCase {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute({
    customerId,
    expenseId,
    description,
    amount,
    date,
  }: EditExpenseUseCaseRequest): Promise<EditExpenseUseCaseResponse> {
    const expense = await this.expensesRepository.findByCustomerId(
      customerId,
      expenseId,
    )

    if (!expense) {
      throw new ExpenseNotFoundError()
    }

    expense.description = description
    expense.amount = amount
    expense.date = date

    await this.expensesRepository.save(expense)

    return {
      expense,
    }
  }
}
