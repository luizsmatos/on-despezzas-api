import { Customer } from '@/entities/customer'
import { CustomersRepository } from '@/repositories/customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.id === id)

    return customer ?? null
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email)

    return customer ?? null
  }

  async create(customer: Customer): Promise<void> {
    this.items.push(customer)
  }
}
