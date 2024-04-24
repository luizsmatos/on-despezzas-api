import { Encryption } from '@/domain/cryptography/encryption'

export class FakerEncryption implements Encryption {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
