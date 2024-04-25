import { Expense } from '@/domain/entities/expense'
import { ExpensesRepository } from '@/domain/repositories/expenses-repository'
import { MailProvider } from '@/infra/providers/mail/mail-provider'

interface CreateExpenseUseCaseRequest {
  customerId: string
  email: string
  description: string
  amount: number
  date: Date
}

interface CreateExpenseUseCaseResponse {
  expense: Expense
}

export class CreateExpenseUseCase {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly mailProvider: MailProvider,
  ) {}

  async execute({
    customerId,
    email,
    description,
    amount,
    date,
  }: CreateExpenseUseCaseRequest): Promise<CreateExpenseUseCaseResponse> {
    const expense = Expense.create({
      customerId,
      description,
      amount,
      date,
    })

    await this.expensesRepository.create(expense)
    await this.sendMailAboutExpenseCreation(email, expense)

    return {
      expense,
    }
  }

  async sendMailAboutExpenseCreation(email: string, expense: Expense) {
    const subject = 'Nova Despesa Criada'
    const body = `
      Uma nova despesa foi criada com sucesso.\n
      Descrição: ${expense.description}\n
      Valor: ${expense.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}\n
      Data: ${expense.date.toLocaleDateString('pt-BR')}
    `

    await this.mailProvider.send({
      to: email,
      subject,
      body,
    })
  }
}
