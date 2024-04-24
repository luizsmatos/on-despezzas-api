import { Router } from 'express'

import { createExpenseController } from '../controllers/create-expense-controller'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt-middleware'

const expensesRoutes = Router()

expensesRoutes.use(verifyJwtMiddleware)
expensesRoutes.post('/expenses', createExpenseController)

export { expensesRoutes }
