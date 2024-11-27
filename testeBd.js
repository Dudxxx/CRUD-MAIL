import { sql } from "./bd.js"

async function criar(){
  try {
   await sql`
     DROP TABLE IF EXISTS usuarios;
   `
   console.log("Tabela apagada")
 } catch (error) {
   console.log(error)
  
 }
  try {
   await sql`
     CREATE TABLE usuarios (
       id      VARCHAR(50)  PRIMARY KEY,    
       nome    VARCHAR(100),
       email   VARCHAR(150),
       celular VARCHAR(15) 
     );
   `
   console.log("Tabela criada")
 } catch (error) {
   console.log(error)
  
 }




}

criar()