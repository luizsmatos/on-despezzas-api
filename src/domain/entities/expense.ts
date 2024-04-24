import { randomUUID } from 'node:crypto'

export class Expense {
  id: string
  description: string
  amount: number
  date: Date
  customerId: string
  createdAt: Date
  updatedAt?: Date | null

  private constructor(props: Expense) {
    this.id = props.id
    this.description = props.description
    this.amount = props.amount
    this.customerId = props.customerId
    this.date = props.date
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(
    props: Omit<Expense, 'id' | 'createdAt'>,
    id?: string,
  ): Expense {
    const expense = new Expense({
      ...props,
      id: id ?? randomUUID(),
      createdAt: new Date(),
    })

    return expense
  }
}
