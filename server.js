import { fastify } from "fastify"
import cors from '@fastify/cors' // Importa o plugin CORS para permitir requisições de diferentes origens
import 'dotenv/config'
import { DatabasePostgres } from "./database-postgres.js";



// Instancia do servidor
const server = fastify()
// Instancia do Banco de Dados
const database = new DatabasePostgres();

await server.register(cors, {
  origin: '*', // Configuração que permite requisições de qualquer domínio (usar com cautela em produção)
});

server.post("/usuarios", async (request, reply) => {
    const { title, description, duration } = request.body;
  
    await database.create({
      title: title,
      description: description,
      duration: duration,
    });
  
    return reply.status(201).send();
  });
  
  server.get("/usuarios", async (request, reply) => {                                    
    const {search} = request.query
    const usuarios = await database.list(search);
    return usuarios;
  });
  
  server.put("/usuarios/:id", async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;
  
    await database.update(videoId, {
      title,
      description,
      duration,
    });
  
    return reply.status(204).send();
  });
  
  server.delete("/usuarios/:id", async (request, reply) => {
    const videoId = request.params.id;
  
    await database.delete(videoId);
    return reply.status(204).send();
  });
  
  server.listen({
    host: "0.0.0.0", // configuração para funcionar no render
    port: process.env.PORT ?? 3333, // configuração para funcionar no render
  });