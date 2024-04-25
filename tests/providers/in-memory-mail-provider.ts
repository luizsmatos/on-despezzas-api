import { MailProvider, SendParams } from '@/infra/providers/mail/mail-provider'

export class InMemoryMailProvider implements MailProvider {
  public items: unknown[] = []

  async send({ to, subject, body }: SendParams): Promise<void> {
    this.items.push({ to, subject, body })
  }
}
