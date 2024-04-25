import { makeCustomer } from 'tests/factories/make-customer'
import { InMemoryMailProvider } from 'tests/providers/in-memory-mail-provider'
import { InMemoryExpensesRepository } from 'tests/repositories/in-memory-expenses-repository'

import { CreateExpenseUseCase } from './create-expense'

let sut: CreateExpenseUseCase
let inMemoryExpensesRepository: InMemoryExpensesRepository
let inMemoryMailProvider: InMemoryMailProvider

describe('Create Expense UseCase', () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository()
    inMemoryMailProvider = new InMemoryMailProvider()

    sut = new CreateExpenseUseCase(
      inMemoryExpensesRepository,
      inMemoryMailProvider,
    )
  })

  it('should be able create a new expense', async () => {
    const customer = makeCustomer()

    const result = await sut.execute({
      customerId: customer.id,
      email: customer.email,
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
    expect(inMemoryMailProvider.items).toHaveLength(1)
  })
})
