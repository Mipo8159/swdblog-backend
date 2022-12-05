export const swagBadRequest = (message: string) => ({
  statusCode: 400,
  message,
  error: 'Bad Request',
})

export const swagUnauthorized = (message: string) => ({
  statusCode: 401,
  message,
})
