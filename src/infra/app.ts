import express from 'express'

import { customersRouter } from './http/routes/customers-routes'

const app = express()

app.use(express.json())

app.use(customersRouter)

export { app }
