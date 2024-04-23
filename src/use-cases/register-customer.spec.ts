import { FakerHasher } from 'tests/cryptography/faker-hasher'
import { makeCustomer } from 'tests/factories/make-customer'
import { InMemoryCustomersRepository } from 'tests/repositories/in-memory-customers-repository'

import { RegisterCustomerUseCase } from './register-customer'
import { CustomerAlreadyExistsError } from './errors/customer-already-exists-error'

let sut: RegisterCustomerUseCase
let inMemoryCustomersRepository: InMemoryCustomersRepository
let fakerHasher: FakerHasher

describe('Register Customer UseCase', () => {
  beforeEach(() => {
    fakerHasher = new FakerHasher()
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    sut = new RegisterCustomerUseCase(inMemoryCustomersRepository, fakerHasher)
  })

  it('should be able to register a new customer', async () => {
    const result = await sut.execute({
      name: 'Adeline Woods',
      email: 'gavur@aw.bm',
      password: '6hliR1Sw',
    })

    const hashedPassword = await fakerHasher.hash('6hliR1Sw')

    expect(result).toEqual({
      customer: expect.objectContaining({
        id: expect.any(String),
      }),
    })
    expect(inMemoryCustomersRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })

  it('should not be able to register a new customer with an email that is already in use', async () => {
    await inMemoryCustomersRepository.create(
      makeCustomer({ email: 'gavur@aw.bm' }),
    )

    await expect(
      sut.execute({
        name: 'Adeline Woods',
        email: 'gavur@aw.bm',
        password: '6hliR1Sw',
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })
})
