import { Customer } from '@/domain/entities/customer'
import { CustomersRepository } from '@/domain/repositories/customers-repository'

import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper'
import { prisma } from '../prisma'

export class PrismaCustomersRepository implements CustomersRepository {
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    if (!customer) return null

    return PrismaCustomerMapper.toDomain(customer)
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    if (!customer) return null

    return PrismaCustomerMapper.toDomain(customer)
  }

  async create(customer: Customer): Promise<void> {
    const prismaCustomer = PrismaCustomerMapper.toPersistence(customer)

    await prisma.customer.create({
      data: prismaCustomer,
    })
  }
}
