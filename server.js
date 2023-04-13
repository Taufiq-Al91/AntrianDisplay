const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const mysql = require('mysql');

app.set('view engine', 'ejs');

app.use(express.static('public'));



// Lalu, Anda dapat menggunakan objek connection untuk melakukan query database.
// connection.query('SELECT * FROM table_name', (error, results, fields) => {
//   if (error) throw error;
//   console.log(results);
// });



app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/ViewAntrian', function(req, res) {
  res.render('pages/viewAntrian');
});

app.get('/display', function(req, res) {
  res.render('pages/display');
});



// Jalankan server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
