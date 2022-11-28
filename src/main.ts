if (process.env.NODE_ENV === 'production') {
  require('module-alias/register')
}
import {NestFactory} from '@nestjs/core'
import {AppModule} from '@app/app.module'

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

start()
