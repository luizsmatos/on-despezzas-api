import { makeCustomer } from 'tests/factories/make-customer'
import { makeExpense } from 'tests/factories/make-expense'
import { InMemoryExpensesRepository } from 'tests/repositories/in-memory-expenses-repository'

import { ListExpensesUseCase } from './list-expenses'

let sut: ListExpensesUseCase
let inMemoryExpensesRepository: InMemoryExpensesRepository

describe('List Expenses Customer UseCase', () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository()

    sut = new ListExpensesUseCase(inMemoryExpensesRepository)
  })

  it('should be able to list a customer expenses', async () => {
    const customer = makeCustomer()

    const expense1 = makeExpense({ id: 'expense-1', customerId: customer.id })
    const expense2 = makeExpense({ id: 'expense-2', customerId: customer.id })
    const expense3 = makeExpense({ id: 'expense-3', customerId: customer.id })

    await inMemoryExpensesRepository.create(expense1)
    await inMemoryExpensesRepository.create(expense2)
    await inMemoryExpensesRepository.create(expense3)

    const result = await sut.execute({
      customerId: customer.id,
      page: 1,
    })

    expect(result).toEqual({
      expenses: expect.arrayContaining([
        expect.objectContaining({
          id: expense1.id,
        }),
        expect.objectContaining({
          id: expense2.id,
        }),
        expect.objectContaining({
          id: expense3.id,
        }),
      ]),
    })
    expect(inMemoryExpensesRepository.items).toHaveLength(3)
  })

  it('should be able to list paginated expenses', async () => {
    const customer = makeCustomer()

    for (let i = 1; i <= 22; i++) {
      await inMemoryExpensesRepository.create(
        makeExpense({ customerId: customer.id }),
      )
    }

    const result = await sut.execute({
      customerId: customer.id,
      page: 2,
    })

    expect(result.expenses).toHaveLength(2)
  })
})
