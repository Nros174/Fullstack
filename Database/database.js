const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const app = express();

// Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
app.use(bodyParser.urlencoded({ extended: false })); // ส่งผ่าน Form
app.use(bodyParser.json()); // ส่งด้วย Data JSON

// สร้าง Connection Pool
const dbConn = mysql.createPool({
  host: "localhost",
  user: "root", // ระบุให้ถูกต้อง
  password: "", // ระบุให้ถูกต้อง
  database: "kn_database",
  port: 3306, // default 3306
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// GET /students
app.get("/students", async (req, res) => {
  try {
    const [rows] = await dbConn.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// GET /students/:id
app.get("/students/:id", async (req, res) => {
  try {
    const [rows] = await dbConn.query("SELECT * FROM students WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send("Student not found");
    }
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /students/:id
app.delete("/students/:id", async (req, res) => {
  try {
    const [result] = await dbConn.query("DELETE FROM students WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Student not found");
    }
    res.status(204).send("Deleted successfully");
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// POST /students
app.post("/students", async (req, res) => {
  const { name, age, phone, email } = req.body;

  if (!name || !age || !phone || !email) {
    return res.status(400).send("All fields are required");
  }

  try {
    const [result] = await dbConn.query(
      "INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)",
      [name, age, phone, email]
    );
    res.status(201).send({ id: result.insertId, name, age, phone, email });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /students/:id
app.put("/students/:id", async (req, res) => {
  const { name, age, phone, email } = req.body;

  if (!name || !age || !phone || !email) {
    return res.status(400).send("All fields are required");
  }

  try {
    const [result] = await dbConn.query(
      "UPDATE students SET name = ?, age = ?, phone = ?, email = ? WHERE id = ?",
      [name, age, phone, email, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send("Student not found");
    }
    res.status(200).send({ id: req.params.id, name, age, phone, email });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/student.html');
   });

// Start the server
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
