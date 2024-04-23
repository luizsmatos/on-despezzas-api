import { HashComparer } from '@/cryptography/hash-comparer'
import { HashGenerator } from '@/cryptography/hash-generator'

export class FakerHasher implements HashGenerator, HashComparer {
  async compare(plain: string, hash: string): Promise<boolean> {
    const hashed = await this.hash(plain)

    return hashed === hash
  }

  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}
