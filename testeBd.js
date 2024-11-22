import {sql} from './bd.js'
sql`
    DRP TABLE IF EXIST videos;
`.then(() => {
    console.log('--Tabela Deletada--')
})
sql`
    CREATE TABLE videos (
        id              TEXT PRIMARY KEY,
        title           TEXT,
        description     TEXT,
        duration        TEXT
    );
`.then(() => {
    console.log('--Tabela Criada--')
})