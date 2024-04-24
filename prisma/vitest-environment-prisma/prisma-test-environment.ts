import 'dotenv/config'

import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const databaseName = randomUUID()
    const databaseURL = `file:./${databaseName}.db`

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      teardown() {
        fs.unlinkSync(path.join(__dirname, '..', `${databaseName}.db`))
      },
    }
  },
}
