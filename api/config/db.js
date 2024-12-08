import { Sequelize } from "sequelize";

// Configuración de PostgreSQL
const postgres = new Sequelize("postgres_db", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

// Configuración de MySQL
const mysql = new Sequelize("mysql_db", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export { postgres, mysql };
