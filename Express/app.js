//start in terminal and "npm init and "npm install express" 
//ip adress 127.0.0.1:3000
const express = require('express');
const app = express();
app.get('/', (req, res) => {
res.send('This is index page.' );
});

//127.0.0.1:3000/my-json-api
// http://localhost:3000/my-json-api
app.get('/my-json-api', (req, res) => {
 res.send('{"myJsonKey":"myJsonValue"}');
});

//127.0.0.1:3000/my-json-api2
// http://localhost:3000/my-json-api2
app.get('/my-json-api2', (req, res) => {
    res.send('{"myJsonKey2":"myJsonValue2"}');
   });

app.listen(3000, () => {
console.log('server started on port 3000!' );
});

// run node app.js to start server
//ctrl+c to end server