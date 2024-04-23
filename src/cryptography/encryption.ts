export interface Encryption {
  encrypt(payload: Record<string, unknown>): Promise<string>
}
