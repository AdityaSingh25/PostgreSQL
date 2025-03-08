"use strict";
//mysql I have not beign seen used at all, idk why
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost:5431/postgres",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect(); // better to await as connection will take some time to establish
        const result = yield client.query(`
        CREATE TABLE USERS(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

        )`);
        console.log(result);
    });
}
//createUsersTable();
// async function insertUser() {
//   try {
//     await client.connect();
//     const insertQuery = `
//             INSERT INTO users(username, password, email)
//             VALUES('user1','123456','user1@gmail.com' )
//         `;
//     const result = await client.query(insertQuery);
//     console.log(result);
//   } catch (e) {
//     console.log("Error during insertion", e);
//   } finally {
//     await client.end();
//   }
// }
// //  right way to insert data in database👇👇👇👇👇👇
// // but this is not secure way to insert users due to SQL INJECTION, here in values instead of 'user1' we user pass some sql query to delete all users it will delete the users, to prevent this we will run query like this ->
// // const insertUserSecure = async () => {
// //   try {
// //     await client.connect();
// //     const insertQuery = `
// //             INSERT INTO users(username, password, email)
// //             VALUES($1,$2,$3 )
// //         `;
// //      const values = ["user1", "123456", "dedew@gmail.com"];
// //     const result = await client.query(insertQuery,values); // this is secure way to insert data
// //insertUser();
// // get data
// async function getUser() {
//   try {
//     await client.connect();
//     const result = await client.query(`SELECT * FROM users`);
//     console.log(result.rows);
//   } catch (e) {
//     console.log("Error while fetching", e);
//   } finally {
//     await client.end();
//   }
// }
// //console.log(getUser());
// // get user from his email id
// const getUserByEmail = async (email: string) => {
//   try {
//     await client.connect();
//     const query = `SELECT * from users where email = $1`;
//     const result = await client.query(query, [email]);
//     console.log(result.rows);
//     return result.rows;
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.end();
//   }
// };
// console.log(getUserByEmail("user1@gmail.com"));
// update user
const updateUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const query = `Update users SET password=$1 where email = $2`;
        const values = ["changedPassword", "user1@gmail.com"];
        const result = yield client.query(query, values);
        console.log(result);
        return result;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.end();
    }
});
console.log(updateUser("user1@gmail.com"));
