import { Customer } from '@/entities/customer'

export interface CustomersRepository {
  findById(id: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  create(customer: Customer): Promise<void>
}
