import 'dotenv/config';
import postgres from 'postgres';

export const sql = postgres(
  process.env.URL,
  {
    ssl: { rejectUnauthorized: false }, // Configuração correta para SSL
  }
);
