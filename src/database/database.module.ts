import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config'; // <-- añadir ConfigModule
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],               // <-- agregar aquí
      inject: [config.KEY],
      useFactory: (cfg: ConfigType<typeof config>) => ({
        type: 'postgres',
        host: cfg.database.host,
        port: cfg.database.port,
        username: cfg.database.user,
        password: cfg.database.password,
        database: cfg.database.name,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}