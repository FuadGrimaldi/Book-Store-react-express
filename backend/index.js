import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book",
});

// agar bisa menambah format json
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello wordl");
});

// get all data
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// post data
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUE (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }
    return res.json("Success add book");
  });
});

app.listen(8080, () => {
  console.log("Server is running");
});
