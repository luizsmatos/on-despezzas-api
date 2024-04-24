import { Router } from 'express'

import { registerCustomerController } from '../controllers/register-customer-controller'

const customersRouter = Router()

customersRouter.post('/customers', registerCustomerController)

export { customersRouter }
