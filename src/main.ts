import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configurar Swagger/OpenApi
  const config = new DocumentBuilder()
    .setTitle('Base do Conhecimento - NestJS')
    .setDescription(`API Rest realizando seguindo o curso de Web Moderno da Cod3rs e transformando o último projeto 
      "Base do Conhecimento" do ExpressJS para o NestJS por conta própria`)
    .setVersion('1.0')
    .addTag('users')
    .addTag('articles')
    .addTag('categories')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app, document);

  //Configurar class-validator / class-transform
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  useContainer(app.select(AppModule), {fallbackOnErrors:true});

  await app.listen(3000);
}
bootstrap();
