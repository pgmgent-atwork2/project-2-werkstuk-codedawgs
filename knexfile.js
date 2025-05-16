import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DATABASE_NAME || "db_filterapp.sqlite3";

const config = {
  development: {
    client: "sqlite3",
    connection: {
      filename: `./${dbName}`,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations", 
      directory: "./server/migrations",
      stub: "./migration.stub",
    },
    seeds: {
      directory: "./server/seeds",
      stub: "./seed.stub",
    },
  },
};

export default config;