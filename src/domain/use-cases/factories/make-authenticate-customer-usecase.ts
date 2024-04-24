import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { JwtEncryption } from '@/infra/cryptography/jwt-encryption'
import { PrismaCustomersRepository } from '@/infra/database/prisma/repositories/prisma-customers-repository'

import { AuthenticateCustomerUseCase } from '../authenticate-customer'

export function makeAuthenticateCustomerUseCase(): AuthenticateCustomerUseCase {
  const customersRepository = new PrismaCustomersRepository()
  const hasher = new BcryptHasher()
  const encryption = new JwtEncryption()

  const useCase = new AuthenticateCustomerUseCase(
    customersRepository,
    hasher,
    encryption,
  )

  return useCase
}
