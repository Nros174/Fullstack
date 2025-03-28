//npm i express nodemon mysql2
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.get('/students', (req, res) => {
 const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'kn_database',
 });

 // เปิด connection ไปที่ database
 connection.connect();

 connection.query('SELECT * from students Where id = "1"', (err, rows, fields) => {
   if (err) throw err;

   // return response กลับไปหา client โดยแปลง record เป็น json array
   res.json(rows);
 });

 // ปิด connection
 connection.end();
});

app.listen(3000, () => {
 console.log('server started on port 3000!');
});

