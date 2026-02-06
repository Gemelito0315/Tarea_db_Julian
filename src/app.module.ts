import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

// Asegúrate de que el archivo se llame exactamente enviroments.ts (sin la 'n') 
// si lo vas a importar así, o cámbialo a environments.ts
import { enviroments } from './enviroments'; 
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Usamos Type Casting o una validación simple para evitar errores de indexación
      envFilePath: enviroments[process.env.NODE_ENV as keyof typeof enviroments] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().default('tarea_db'),
        POSTGRES_USER: Joi.string().default('Tarea'),
        POSTGRES_PASSWORD: Joi.string().default('123456'),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_HOST: Joi.string().default('127.0.0.1'),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}