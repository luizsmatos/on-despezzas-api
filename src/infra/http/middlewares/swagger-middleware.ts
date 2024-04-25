import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'

import docs from '../docs/swagger'

export function swaggerMiddleware(app: Express): void {
  const options: swaggerUi.SwaggerUiOptions = {
    swaggerOptions: {
      url: '/docs/swagger.json',
      defaultModelsExpandDepth: -1,
    },
  }

  app.get('/docs/swagger.json', (_request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.json(docs)
  })

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, options))
}
