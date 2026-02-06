import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.POSTGRES_DB || 'tarea_db',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      user: process.env.POSTGRES_USER || 'Tarea',
      password: process.env.POSTGRES_PASSWORD || '123456',
      host: process.env.POSTGRES_HOST || '127.0.0.1',
    },
  };
});