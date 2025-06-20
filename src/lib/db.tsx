import knex from "knex";

const env = process.env;
const db = knex({
  client: "mysql2",
  connection: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || "3306"),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
});

export default db;
