/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function errorHandlerMiddleware(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return response.status(400).send({
      message: `Error validating request`,
      errors: err.flatten().fieldErrors,
    })
  }

  return response.status(500).json({ message: 'Internal server error' })
}
