import * as Joi from 'joi'

export const JoiValidation = () =>
  Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
    PORT: Joi.number().required(),
    DB_TYPE: Joi.string().valid('mysql', 'postgres').required(),
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRE: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRE: Joi.string().required(),
  })
