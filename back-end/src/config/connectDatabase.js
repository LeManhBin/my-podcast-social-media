import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

// create the connection to database
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "my_podcast",
});
// Tên db, name, password
const sequelize = new Sequelize("my_podcast", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
