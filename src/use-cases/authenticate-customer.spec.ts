import { FakerEncryption } from 'tests/cryptography/faker-encryption'
import { FakerHasher } from 'tests/cryptography/faker-hasher'
import { makeCustomer } from 'tests/factories/make-customer'
import { InMemoryCustomersRepository } from 'tests/repositories/in-memory-customers-repository'

import { AuthenticateCustomerUseCase } from './authenticate-customer'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let sut: AuthenticateCustomerUseCase
let inMemoryCustomersRepository: InMemoryCustomersRepository
let fakerHasher: FakerHasher
let fakerEncryption: FakerEncryption

describe('Authenticate Customer UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    fakerHasher = new FakerHasher()
    fakerEncryption = new FakerEncryption()

    sut = new AuthenticateCustomerUseCase(
      inMemoryCustomersRepository,
      fakerHasher,
      fakerEncryption,
    )
  })

  it('should be able to authenticate a customer', async () => {
    const customer = makeCustomer({
      email: 'nectiz@maphi.nu',
      password: await fakerHasher.hash('123456'),
    })

    await inMemoryCustomersRepository.create(customer)

    const result = await sut.execute({
      email: 'nectiz@maphi.nu',
      password: '123456',
    })

    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate a customer with invalid email', async () => {
    await expect(
      sut.execute({
        email: 'invalid_email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate a customer with invalid password', async () => {
    const customer = makeCustomer({
      email: 'nectiz@maphi.nu',
      password: await fakerHasher.hash('123456'),
    })

    await inMemoryCustomersRepository.create(customer)

    await expect(
      sut.execute({
        email: 'nectiz@maphi.nu',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
