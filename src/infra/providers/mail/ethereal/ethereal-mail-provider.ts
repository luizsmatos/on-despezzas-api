import nodemailer from 'nodemailer'

import { MailProvider, SendParams } from '../mail-provider'

export class EtherealMailProvider implements MailProvider {
  private transporter!: nodemailer.Transporter

  private async init(): Promise<void> {
    const testAccount = await nodemailer.createTestAccount()

    this.transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  }

  async send({ to, subject, body }: SendParams): Promise<void> {
    if (!this.transporter) {
      await this.init()
    }

    const message = await this.transporter.sendMail({
      from: 'noreply@on-despezzas.com',
      to,
      subject,
      text: body,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
