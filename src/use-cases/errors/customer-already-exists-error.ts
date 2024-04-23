export class CustomerAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`Customer "${identifier}" already exists`)
    this.name = 'CustomerAlreadyExistsError'
  }
}
