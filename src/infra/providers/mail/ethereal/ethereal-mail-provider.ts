import nodemailer from 'nodemailer'

import { MailProvider, SendParams } from '../mail-provider'

export class EtherealMailProvider implements MailProvider {
  private transporter!: nodemailer.Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })
      })
      .catch((error) => {
        console.error(error)

        throw new Error('Error creating EtherealMailProvider')
      })
  }

  async send({ to, subject, body }: SendParams): Promise<void> {
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
