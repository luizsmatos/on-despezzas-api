import { Express } from 'express'
import request from 'supertest'

export async function createAndAuthenticateCustomer(app: Express) {
  await request(app).post('/customers').send({
    name: 'Edgar Washington',
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const authResponse = await request(app).post('/customers/login').send({
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const { accessToken } = authResponse.body

  return { accessToken }
}
