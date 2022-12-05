if (process.env.NODE_ENV === 'production') {
  require('module-alias/register')
}
import {NestFactory} from '@nestjs/core'
import {AppModule} from '@app/app.module'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger'

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
  }

  const config = new DocumentBuilder()
    .setTitle('SWDblog')
    .setDescription('The SWDblog API description')
    .setVersion('1.0.0')
    .addTag('SWD BLOG')
    .addBearerAuth()
    .addCookieAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document, customOptions)

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

start()
