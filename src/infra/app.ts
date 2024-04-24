import 'express-async-errors'
import express from 'express'

import { errorHandlerMiddleware } from './http/middlewares/error-handler-middleware'
import { customersRouter } from './http/routes/customers-routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(customersRouter)

app.use(errorHandlerMiddleware)

export { app }
