import { Customer as PrismaCustomer, Prisma } from '@prisma/client'
import { Customer } from '@/domain/entities/customer'

export class PrismaCustomerMapper {
  static toPersistence(
    customer: Customer,
  ): Prisma.CustomerUncheckedCreateInput {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt ?? undefined,
    }
  }

  static toDomain(raw: PrismaCustomer): Customer {
    return Customer.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
}
