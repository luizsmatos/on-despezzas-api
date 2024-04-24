import { Customer } from '@/domain/entities/customer'

export {}

declare global {
  namespace Express {
    interface Request {
      customer: Customer
    }
  }
}
