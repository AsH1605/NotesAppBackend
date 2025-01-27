import { error } from 'console'
import { knex, setupDBConnection } from './db'

const initializeDatabase = async() => {
    await setupDBConnection()
    await knex.raw(`
        CREATE TABLE server_user (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        created_at TIMESTAMP,
        last_updated_at TIMESTAMP
        );
        `)
    await knex.raw(`
        CREATE TABLE note (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES server_user (id),
        title VARCHAR(255),
        content text,
        created_at TIMESTAMP,
        last_updated_at TIMESTAMP
        );
        `)
}

initializeDatabase().then (()=> {
    console.log("Tables created sucessfully")
}).catch(e => {
    console.log(e)
}).finally(()=>{
    knex.destroy()
})