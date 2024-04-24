import { randomUUID } from 'node:crypto'

export class Customer {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null

  private constructor(props: Customer) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.createdAt = props.createdAt
  }

  static create(props: Omit<Customer, 'id' | 'createdAt'>, id?: string) {
    const customer = new Customer({
      ...props,
      id: id ?? randomUUID(),
      createdAt: new Date(),
    })

    return customer
  }
}
