import { Customer } from '@/domain/entities/customer'
import { HashGenerator } from '@/domain/cryptography/hash-generator'
import { CustomersRepository } from '@/domain/repositories/customers-repository'

import { CustomerAlreadyExistsError } from './errors/customer-already-exists-error'

interface RegisterCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterCustomerUseCaseResponse {
  customer: Customer
}

export class RegisterCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {
    const customerWithSameEmail =
      await this.customersRepository.findByEmail(email)

    if (customerWithSameEmail) {
      throw new CustomerAlreadyExistsError(email)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const customer = Customer.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.customersRepository.create(customer)

    return {
      customer,
    }
  }
}
