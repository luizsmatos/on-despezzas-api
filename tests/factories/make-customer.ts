import { faker } from '@faker-js/faker'

import { Customer } from '@/domain/entities/customer'

export function makeCustomer(override: Partial<Customer> = {}): Customer {
  return Customer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    override.id,
  )
}
