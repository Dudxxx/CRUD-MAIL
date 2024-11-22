import { fastify } from "fastify"
import 'dotenv/config'
import { DatabasePostgres } from "./database-postgres.js";



// Instancia do servidor
const server = fastify()
// Instancia do Banco de Dados
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
    const { title, description, duration } = request.body;
  
    await database.create({
      title: title,
      description: description,
      duration: duration,
    });
  
    return reply.status(201).send();
  });
  
  server.get("/videos", async (request, reply) => {                                    
    const videos = await database.list(search);
    return videos;
  });
  
  server.put("/videos/:id", async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;
  
    await database.update(videoId, {
      title,
      description,
      duration,
    });
  
    return reply.status(204).send();
  });
  
  server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id;
  
    await database.delete(videoId);
    return reply.status(204).send();
  });
  
  server.listen({
    host: "0.0.0.0", // configuração para funcionar no render
    port: process.env.PORT ?? 3333, // configuração para funcionar no render
  });