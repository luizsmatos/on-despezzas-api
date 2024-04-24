import { makeCustomer } from 'tests/factories/make-customer'
import { makeExpense } from 'tests/factories/make-expense'
import { InMemoryExpensesRepository } from 'tests/repositories/in-memory-expenses-repository'

import { GetExpenseUseCase } from './get-expense'
import { ExpenseNotFoundError } from './errors/expense-not-found-error'

let sut: GetExpenseUseCase
let inMemoryExpensesRepository: InMemoryExpensesRepository

describe('Get Expense Customer UseCase', () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository()

    sut = new GetExpenseUseCase(inMemoryExpensesRepository)
  })

  it('should be able to get a customer expense', async () => {
    const customer = makeCustomer()
    const expense = makeExpense({ customerId: customer.id })

    await inMemoryExpensesRepository.create(expense)

    const result = await sut.execute({
      customerId: customer.id,
      expenseId: expense.id,
    })

    expect(result).toEqual({
      expense: expect.objectContaining({
        id: expense.id,
      }),
    })
    expect(inMemoryExpensesRepository.items).toHaveLength(1)
  })

  it("should not be able to get an expense if it doesn't exist", async () => {
    await expect(
      sut.execute({
        customerId: 'customer-id',
        expenseId: 'not-found',
      }),
    ).rejects.toBeInstanceOf(ExpenseNotFoundError)
  })
})
