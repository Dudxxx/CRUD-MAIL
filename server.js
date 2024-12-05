import { fastify } from "fastify";
import cors from '@fastify/cors'; // Importa o plugin CORS para permitir requisições de diferentes origens
import 'dotenv/config';
import { DatabasePostgres } from "./database-postgres.js";

// Instancia do servidor
const server = fastify();
// Instancia do Banco de Dados
const database = new DatabasePostgres();

await server.register(cors, {
  origin: '*', // Permite requisições de qualquer origem (pode ser ajustado para produção)
});

server.get("/usuarios", async (request, reply) => {                                    
  const {search} = request.query
  const usuarios = await database.list(search);
  return usuarios;
});


server.post("/usuarios", async (request, reply) => {
  const { nome, email, celular } = request.body;

  // Validação básica para garantir que todos os campos estão presentes
  if (!nome || !email || !celular) {
    return reply.status(400).send({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Chama o método 'create' para adicionar o novo usuário
    await database.create({ nome, email, celular });
    return reply.status(201).send({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Erro ao cadastrar o usuário." });
  }
});

server.listen({
  host: "0.0.0.0", // Configuração para render (pode ser ajustado para localhost)
  port: process.env.PORT ?? 3333, // Usando a porta configurada no arquivo .env
});
