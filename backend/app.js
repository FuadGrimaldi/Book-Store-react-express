const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./src/db/connect");
const bookRoute = require("./src/resources/books/books.routes");
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
// format json
app.use(express.json());

// connect db
const db = connectDb();
app.use((req, res, next) => {
  req.db = db;
  next();
});
// routes
app.use("/books", bookRoute);

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
