import { Router } from 'express'

import { authenticateCustomerController } from '../controllers/authenticate-customer-controller'
import { registerCustomerController } from '../controllers/register-customer-controller'

const customersRoutes = Router()

customersRoutes.post('/customers', registerCustomerController)
customersRoutes.post('/customers/login', authenticateCustomerController)

export { customersRoutes }
