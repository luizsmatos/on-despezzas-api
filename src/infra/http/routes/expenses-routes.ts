import { Router } from 'express'

import { createExpenseController } from '../controllers/create-expense-controller'
import { listExpensesController } from '../controllers/list-expenses-controller'
import { getExpenseController } from '../controllers/get-expense-controller'
import { editExpenseController } from '../controllers/edit-expense-controller'
import { deleteExpenseController } from '../controllers/delete-expense-controller'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt-middleware'

const expensesRoutes = Router()

expensesRoutes.use(verifyJwtMiddleware)
expensesRoutes.post('/expenses', createExpenseController)
expensesRoutes.get('/expenses', listExpensesController)
expensesRoutes.get('/expenses/:id', getExpenseController)
expensesRoutes.put('/expenses/:id', editExpenseController)
expensesRoutes.delete('/expenses/:id', deleteExpenseController)

export { expensesRoutes }
