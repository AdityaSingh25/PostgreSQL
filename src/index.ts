//mysql I have not beign seen used at all, idk why

import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:mysecretpassword@localhost:5431/postgres",
});

async function createUsersTable() {
  await client.connect(); // better to await as connection will take some time to establish

  const result = await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

        )`);
  console.log(result);
}

//createUsersTable();

async function insertUser() {
  await client.connect();

  const result = await client.query(`
            INSERT INTO users(username, password, email) 
            VALUES('user1','123456','user1@gmail.com' )
        `);

  console.log(result);
}

insertUser();
