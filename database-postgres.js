import { randomUUID } from "node:crypto";
import { sql } from "./bd.js";

export class DatabasePostgres {

    
  async list(search) {
    let usuarios;

    if (search) {
      usuarios = await sql`select * from usuarios where title ilike ${
        "%" + search + "%"
      }`;
    } else {
      usuarios = await sql`select * from usuarios`;
    }

    return usuarios;
  }

  async create(usuario) {
    const usuarioId = randomUUID();
    const { nome, email, celular } = usuarios;

    await sql`insert into usuarios (id, nome, email, celular) VALUES (${usuarioId}, ${nome}, ${email}, ${celular})`;
  }

  async update(id, usuario) {
    const { nome, email, celular } = usuario;

    await sql`update usuarios set nome = ${nome}, email = ${email}, celular = ${celular} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`delete from usuarios where id = ${id}`;
  }
}