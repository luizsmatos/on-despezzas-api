import { makeCustomer } from 'tests/factories/make-customer'
import { makeExpense } from 'tests/factories/make-expense'
import { InMemoryExpensesRepository } from 'tests/repositories/in-memory-expenses-repository'

import { DeleteExpenseUseCase } from './delete-expense'
import { ExpenseNotFoundError } from './errors/expense-not-found-error'

let sut: DeleteExpenseUseCase
let inMemoryExpensesRepository: InMemoryExpensesRepository

describe('Delete Expense UseCase', () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository()

    sut = new DeleteExpenseUseCase(inMemoryExpensesRepository)
  })

  it('should be able to delete an expense', async () => {
    const customer = makeCustomer()
    const expense = makeExpense({ customerId: customer.id })

    await inMemoryExpensesRepository.create(expense)

    await sut.execute({
      customerId: customer.id,
      expenseId: expense.id,
    })

    expect(inMemoryExpensesRepository.items).toHaveLength(0)
  })

  it("should not be able to delete an expense if it doesn't exist", async () => {
    await expect(
      sut.execute({
        customerId: 'customer-id',
        expenseId: 'not-found',
      }),
    ).rejects.toBeInstanceOf(ExpenseNotFoundError)
  })
})
