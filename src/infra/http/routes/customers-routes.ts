import { Router } from 'express'

import { authenticateCustomerController } from '../controllers/authenticate-customer-controller'
import { registerCustomerController } from '../controllers/register-customer-controller'

const customersRouter = Router()

customersRouter.post('/customers', registerCustomerController)
customersRouter.post('/customers/login', authenticateCustomerController)

export { customersRouter }
