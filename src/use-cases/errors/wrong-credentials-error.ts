export class WrongCredentialsError extends Error {
  constructor() {
    super('Credentials are invalid')
    this.name = 'WrongCredentialsError'
  }
}
