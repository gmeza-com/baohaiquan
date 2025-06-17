import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "baohaiquan",
    password: ')VZcsG$/%ex&Sq"hUU',
    database: "baohaiquanvietnam.vn",
  },
});

export default db;
