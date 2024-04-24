import { Expense } from '@/domain/entities/expense'
import { ExpensesRepository } from '@/domain/repositories/expenses-repository'

interface ListExpensesUseCaseRequest {
  customerId: string
  page: number
}

interface ListExpensesUseCaseResponse {
  expenses: Expense[]
}

export class ListExpensesUseCase {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async execute({
    customerId,
    page,
  }: ListExpensesUseCaseRequest): Promise<ListExpensesUseCaseResponse> {
    const expenses = await this.expensesRepository.findManyByCustomerId(
      customerId,
      {
        page,
      },
    )

    return {
      expenses,
    }
  }
}
