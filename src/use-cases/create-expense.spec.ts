import { makeCustomer } from 'tests/factories/make-customer'
import { InMemoryExpensesRepository } from 'tests/repositories/in-memory-expenses-repository'

import { CreateExpenseUseCase } from './create-expense'

let sut: CreateExpenseUseCase
let inMemoryExpensesRepository: InMemoryExpensesRepository

describe('Create Expense UseCase', () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository()

    sut = new CreateExpenseUseCase(inMemoryExpensesRepository)
  })

  it('should be able create a new expense', async () => {
    const customer = makeCustomer()

    const result = await sut.execute({
      customerId: customer.id,
      description: 'New expense',
      amount: 100,
      date: new Date(),
    })

    expect(result).toEqual({
      expense: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(inMemoryExpensesRepository.items).toHaveLength(1)
  })
})
