import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
w
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Bike Rental API')
    .setDescription('API para gerenciamento de aluguel de bicicletas')
    .setVersion('1.0')
    .addTag('users')      
    .addTag('bikes')      
    .addTag('carts')      
    .addTag('cart-items')
    .addTag('payments')    
    //.addBearerAuth()     
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
