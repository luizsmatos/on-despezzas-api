import { faker } from '@faker-js/faker'

import { Expense } from '@/entities/expense'

export function makeExpense(override: Partial<Expense> = {}): Expense {
  return Expense.create(
    {
      description: faker.lorem.sentence(),
      amount: faker.number.float(),
      date: faker.date.recent(),
      customerId: faker.string.uuid(),
      ...override,
    },
    override.id,
  )
}
