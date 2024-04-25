import 'express-async-errors'
import express from 'express'

import { errorHandlerMiddleware } from './http/middlewares/error-handler-middleware'
import { swaggerMiddleware } from './http/middlewares/swagger-middleware'
import { customersRoutes } from './http/routes/customers-routes'
import { expensesRoutes } from './http/routes/expenses-routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

swaggerMiddleware(app)

app.all('/', (_request, response) => {
  response.redirect('/docs')
})

app.use(customersRoutes)
app.use(expensesRoutes)

app.use(errorHandlerMiddleware)

export { app }
