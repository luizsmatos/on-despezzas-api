import request from 'supertest'
import { createAndAuthenticateCustomer } from 'tests/utils/create-and-authenticate-customer'
import { app } from '@/infra/app'

describe('List Expenses Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    const { accessToken } = await createAndAuthenticateCustomer(app)

    await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Café da manhã',
        amount: 10.0,
        date: '2024/01/01',
      })

    await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Almoço',
        amount: 20.0,
        date: '2024/01/01',
      })

    await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Jantar',
        amount: 30.0,
        date: '2024/01/01',
      })

    const response = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.expenses).toHaveLength(3)
  })

  it('should return 200 on success with pagination', async () => {
    const { accessToken } = await createAndAuthenticateCustomer(app)

    await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Café da manhã',
        amount: 10.0,
        date: '2024/01/01',
      })

    const response = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 2 })

    expect(response.statusCode).toEqual(200)
    expect(response.body.expenses).toHaveLength(0)
  })
})
