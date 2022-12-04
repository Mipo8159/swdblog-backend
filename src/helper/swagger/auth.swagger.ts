export const authResponse = {
  user: {
    email: 'abc@a.com',
    username: 'abc',
    password: 'abc123',
    image_url: 'bucket.s3.amazonaws.com/mock-image.jpg',
  },
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
}

export const registerRequest = {
  register: {
    email: 'abc@a.com',
    username: 'Mipo',
    password: '123123',
    image_url: 'image.png',
  },
}

export const accessResponse = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
}

export const loginRequest = {
  login: {
    email: 'abc@a.com',
    password: '123123',
  },
}

export const emailTaken = {
  statusCode: 400,
  message: 'Email in taken',
  error: 'Bad Request',
}

export const invalidCredentials = {
  statusCode: 400,
  message: 'Invalid credentials',
  error: 'Bad Request',
}

export const unauthorized = {
  statusCode: 401,
  message: 'Unauthorized',
}
