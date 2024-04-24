import jwt from 'jsonwebtoken'
import { Encryption } from '@/domain/cryptography/encryption'

import { env } from '../config/env'

export class JwtEncryption implements Encryption {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: '1d',
    })
  }
}
