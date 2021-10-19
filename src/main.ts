import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Personal-Nest')
    .setDescription('This project is part of my personal study about the framework for building efficient, reliable and scalable server-side applications Nest.')
    .setVersion('1.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  const APP_PORT = 3000;
  await app.listen(APP_PORT);
  console.log('Application listen on port: ', APP_PORT);
})();
