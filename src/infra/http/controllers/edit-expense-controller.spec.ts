import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { createAndAuthenticateCustomer } from 'tests/utils/create-and-authenticate-customer'
import { app } from '@/infra/app'

describe('Edit Expense Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const { accessToken } = await createAndAuthenticateCustomer(app)

    const expense = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Almoço',
        amount: 20.0,
        date: '2024/01/01',
      })

    const response = await request(app)
      .put(`/expenses/${expense.body.expense.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Jantar',
        amount: 20.0,
        date: '2024/01/01',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.expense).toEqual(
      expect.objectContaining({
        id: expense.body.expense.id,
        description: 'Jantar',
      }),
    )
  })

  it('should return 404 if expense not found', async () => {
    const { accessToken } = await createAndAuthenticateCustomer(app)

    const invalidId = randomUUID()

    const response = await request(app)
      .put(`/expenses/${invalidId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Jantar',
        amount: 20.0,
        date: '2024/01/01',
      })

    expect(response.statusCode).toEqual(404)
    expect(response.body).toEqual({ message: 'Expense not found' })
  })
})
