export interface SendParams {
  to: string
  subject: string
  body: string
}

export interface MailProvider {
  send(params: SendParams): Promise<void>
}
