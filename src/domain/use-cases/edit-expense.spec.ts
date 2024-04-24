import { makeCustomer } from 'tests/factories/make-customer'
import { makeExpense } from 'tests/factories/make-expense'
import { InMemoryExpensesRepository } from 'tests/repositories/in-memory-expenses-repository'

import { EditExpenseUseCase } from './edit-expense'
import { ExpenseNotFoundError } from './errors/expense-not-found-error'

let sut: EditExpenseUseCase
let inMemoryExpensesRepository: InMemoryExpensesRepository

describe('Edit Expense UseCase', () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository()

    sut = new EditExpenseUseCase(inMemoryExpensesRepository)
  })

  it('should be able to edit an expense', async () => {
    const customer = makeCustomer()
    const expense = makeExpense({ customerId: customer.id })

    await inMemoryExpensesRepository.create(expense)

    const result = await sut.execute({
      customerId: customer.id,
      expenseId: expense.id,
      description: 'New expense EDIT',
      amount: 110,
      date: new Date(),
    })

    expect(result).toEqual({
      expense: expect.objectContaining({
        id: expense.id,
      }),
    })
    expect(inMemoryExpensesRepository.items[0]).toEqual(
      expect.objectContaining({
        id: expense.id,
        description: 'New expense EDIT',
        amount: 110,
      }),
    )
  })

  it("should not be able to edit an expense if it doesn't exist", async () => {
    await expect(
      sut.execute({
        customerId: 'customer-id',
        expenseId: 'not-found',
        description: 'New expense EDIT',
        amount: 110,
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(ExpenseNotFoundError)
  })
})
