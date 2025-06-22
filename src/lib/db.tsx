import knex from "knex";
const env = process.env;

declare global {
  var db: knex.Knex | undefined;
}

if (!globalThis.db) {
  globalThis.db = knex({
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

// Export the global `db` instance
const db: knex.Knex = globalThis.db;
export default db;
