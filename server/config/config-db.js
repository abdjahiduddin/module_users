import Sequelize from "sequelize";
import config from "./config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    port: config.db_port,
    host: config.db_host,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully"))
  .catch((err) => console.log(err));