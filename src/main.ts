if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}
import {NestFactory} from '@nestjs/core'
import {AppModule} from '@app/App.module'

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

start()
