import request from 'supertest'
import { app } from '@/infra/app'

describe('Register Customer Controller (e2e)', () => {
  it('should return 201 on success', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should return 409 if email is already in use', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(409)
    expect(response.body).toEqual({
      message: 'Customer "johndoe@example.com" already exists',
    })
  })
})
