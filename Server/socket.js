const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const mongoURL = 'mongodb+srv://williambanguera:12345@cluster0.wvlmezi.mongodb.net/'; 


MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error al conectar', err);
    return;
  }

  const db = client.db(''); 

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', socket.id);

    socket.on('pedido', (pedido) => {

      db.collection('pedidos').insertOne(pedido, (err, result) => {
        if (err) {
          console.error('Error al guardar el pedido', err);
          return;
        }
        console.log('Pedido guardado', result.insertedId);

     
        const coordenada = obtenerCoordenadaAleatoria(); 
        socket.emit('coordenada', coordenada);
      });
    });
  });


  const port = 3000; 
  server.listen(port, () => {
    console.log('Servidor escuchando en el puerto', port);
  });
});


