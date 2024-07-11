const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error(`Error connecting to the database: ${err}`);
      throw err;
    }
    console.log("Connection to the database");
  });

  return connection;
};

module.exports = connectDb;
