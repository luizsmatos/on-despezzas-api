import { Expense } from '@/domain/entities/expense'
import { ExpensesRepository } from '@/domain/repositories/expenses-repository'

interface CreateExpenseUseCaseRequest {
  customerId: string
  description: string
  amount: number
  date: Date
}

interface CreateExpenseUseCaseResponse {
  expense: Expense
}

export class CreateExpenseUseCase {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute({
    customerId,
    description,
    amount,
    date,
  }: CreateExpenseUseCaseRequest): Promise<CreateExpenseUseCaseResponse> {
    const expense = Expense.create({
      customerId,
      description,
      amount,
      date,
    })

    await this.expensesRepository.create(expense)

    return {
      expense,
    }
  }
}
