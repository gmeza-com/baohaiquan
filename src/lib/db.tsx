import knex from "knex";

let db;

if (!db) {
  const env = process.env;
  db = knex({
    client: "mysql2",
    connection: {
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT || "3306"),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
  });
}

export default db;
