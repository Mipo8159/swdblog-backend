export const authResponse = {
  user: {
    email: 'abc@a.com',
    username: 'abc',
    image_url: 'bucket.s3.amazonaws.com/mock-image.jpg',
    active: true,
  },
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
}

export const registerRequest = {
  register: {
    email: 'abc@a.com',
    username: 'Mipo',
    password: '123123',
    image_url: 'bucket.s3.amazonaws.com/mock-image.jpg',
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

export const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...'
