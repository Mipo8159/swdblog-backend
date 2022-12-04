if (process.env.NODE_ENV === 'production') {
  require('module-alias/register')
}
import {NestFactory} from '@nestjs/core'
import {AppModule} from '@app/app.module'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('SWDblog')
    .setDescription('The SWDblog API description')
    .setVersion('1.0.0')
    .addTag('SWD BLOG')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

start()
