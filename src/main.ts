import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes();
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false,
  });

  const config = new DocumentBuilder()
    .setTitle('System Inventory API')
    .setDescription('The System Inventory API description')
    .setVersion('1.0')
    .addTag('url')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 👇 Esta línea habilita Swagger en la ruta /api
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
