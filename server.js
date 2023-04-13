const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Queue = require('queue-fifo');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');

app.use(express.static('public'));

// Buat antrian pasien
const queue = new Queue();
let counter = 0;

// Endpoint untuk menambahkan pasien ke antrian
app.post('/enqueue', express.json(), (req, res) => {
  const { takeNumber } = req.body;

  if (!takeNumber) {
    return res.status(400).send({ error: 'Invalid request' });
  }

  // Jika takeNumber ada di dalam req.body, lanjutkan eksekusi kode di bawah ini

  counter++;
  const number = counter.toString().padStart(2, '0');
  const queueNumber = `Antrian ${number}`;
  queue.enqueue(queueNumber);

  io.emit('queue', Array.from(queue));
  console.log(queue)
  return res.send({ number: queueNumber });
 
});

// Endpoint untuk mengambil number pasien dari antrian
app.get('/dequeue', (req, res) => {
  const number = queue.dequeue();
  io.emit('queue', Array.from(queue));
  io.emit('dequeued', number);
  return res.send({ number });
});

app.post('/reset', (req, res) => {
  counter = 0;
  queue.clear();
  io.emit('queue', Array.from(queue));
  io.emit('reset');
  res.send({ message: 'Antrian telah direset' });
});


// WebSocket event untuk mengirim antrian ke client saat ada perubahan
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('queue', Array.from(queue));

  socket.on('reset', () => {
    socket.emit('queue', Array.from(queue));
  });

  // Tambahkan baris ini untuk debug
  socket.on('queue', (queue) => {
    console.log(queue);
  });

});

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
