import { JsonObject } from 'swagger-ui-express'

export default Object.freeze({
  openapi: '3.0.0',
  consumes: ['application/json'],
  produces: ['application/json'],
  info: {
    title: 'onDespezzas - Docs',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    security: {
      bearerAuth: [],
    },
    schemas: {
      Unauthorized: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Error validating request',
          },
          errors: {
            type: 'object',
            properties: {
              name: {
                type: 'array',
                items: {
                  type: 'string',
                  example: 'Name is required',
                },
              },
            },
          },
        },
      },
      Customer: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com',
          },
          password: {
            type: 'string',
            example: 'wbQUbWb',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2021-09-01T12:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2021-09-01T12:00:00Z',
          },
        },
        required: ['name', 'email', 'password'],
      },
      CreateCustomerRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
        required: ['name', 'email', 'password'],
      },
      Expense: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          description: {
            type: 'string',
            example: 'Supermarket',
          },
          amount: {
            type: 'number',
            example: 100.0,
          },
          date: {
            type: 'string',
            format: 'date',
            example: '2021-09-01',
          },
          customerId: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2021-09-01T12:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2021-09-01T12:00:00Z',
          },
        },
        required: ['description', 'amount', 'date', 'customerId'],
      },
      CreateExpenseRequest: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            example: 'Supermarket',
          },
          amount: {
            type: 'number',
            example: 100.0,
          },
          date: {
            type: 'string',
            format: 'date',
            example: '2021-09-01',
          },
        },
        required: ['description', 'amount', 'date'],
      },
      EditExpenseRequest: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            example: 'Supermarket',
          },
          amount: {
            type: 'number',
            example: 100.0,
          },
          date: {
            type: 'string',
            format: 'date',
            example: '2021-09-01',
          },
        },
        required: ['description', 'amount', 'date'],
      },
    },
  },
  paths: {
    '/customers': {
      post: {
        tags: ['Customers'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateCustomerRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Success',
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError',
                },
              },
            },
          },
          409: {
            description: 'Conflict',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Customer already exists',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/customers/login': {
      post: {
        tags: ['Customers'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'johndoe@example.com',
                  },
                  password: {
                    type: 'string',
                    example: '123456',
                  },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/ValidationError',
                    },
                    {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  ],
                },
                examples: {
                  WrongCredentials: {
                    value: {
                      message: 'Credentials are invalid',
                    },
                  },
                  ValidationError: {
                    value: {
                      message: 'Error validating request',
                      errors: {
                        email: ['Email is required'],
                        password: ['Password is required'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/expenses': {
      post: {
        tags: ['Expenses'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateExpenseRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    expense: {
                      $ref: '#/components/schemas/Expense',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Unauthorized',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Expenses'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    expenses: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Expense',
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Unauthorized',
                },
              },
            },
          },
        },
      },
    },
    '/expenses/{id}': {
      get: {
        tags: ['Expenses'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    expense: {
                      $ref: '#/components/schemas/Expense',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Unauthorized',
                },
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Expense not found',
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Expenses'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EditExpenseRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    expense: {
                      $ref: '#/components/schemas/Expense',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Unauthorized',
                },
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Expense not found',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Expenses'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          204: {
            description: 'Success',
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Unauthorized',
                },
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Expense not found',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as JsonObject)
