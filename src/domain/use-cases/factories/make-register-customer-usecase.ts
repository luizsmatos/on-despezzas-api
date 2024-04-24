import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaCustomersRepository } from '@/infra/database/prisma/repositories/prisma-customers-repository'

import { RegisterCustomerUseCase } from '../register-customer'

export function makeRegisterCustomerUseCase(): RegisterCustomerUseCase {
  const customersRepository = new PrismaCustomersRepository()
  const hasher = new BcryptHasher()

  const useCase = new RegisterCustomerUseCase(customersRepository, hasher)

  return useCase
}
