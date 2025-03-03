//npm i express nodemon mysql2 ejs
const express = require('express');
const mysql = require("mysql2/promise");
const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"))

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'kn_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});
// Mock database query
const getUsers = () => {
    return [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];
};
app.get('/', async (req, res) => {
   // Replace this with your database query
    const connection = await dbConn
    const users = await connection.query('SELECT * from students')
    console.log(users)
    res.render('index', { users:users[0] });
});
app.listen(3000, () => console.log('Server running on port 3000'));