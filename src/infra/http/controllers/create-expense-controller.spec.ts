import request from 'supertest'
import { createAndAuthenticateCustomer } from 'tests/utils/create-and-authenticate-customer'
import { app } from '@/infra/app'

describe('Create Expense Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const { accessToken } = await createAndAuthenticateCustomer(app)

    const response = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Almoço',
        amount: 20.0,
        date: '2024/01/01',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.expense).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/expenses').send({
      description: 'Almoço',
      amount: 20.0,
      date: '2024/01/01',
    })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual({ message: 'Unauthorized' })
  })

  it('should return 401 if token is invalid', async () => {
    const response = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer invalid-token`)
      .send({
        description: 'Almoço',
        amount: 20.0,
        date: '2024/01/01',
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual({ message: 'Unauthorized' })
  })
})
