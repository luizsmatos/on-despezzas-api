import request from 'supertest'
import { app } from '@/infra/app'

describe('Authenticate Customer Controller (e2e)', () => {
  it('should return 200 on success', async () => {
    await request(app).post('/customers').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app).post('/customers/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ accessToken: expect.any(String) })
  })

  it('should return 400 with wrong credentials', async () => {
    const response = await request(app).post('/customers/login').send({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({ message: 'Credentials are invalid' })
  })
})
