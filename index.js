import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


import Coordenadas from './Coordenadas';
import Pedido from './Pedido';
import Task  from ('./Task');

require('dotenv').config();

const app = express();
const PORT = 4000;


const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
  },
});

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión BD
const uri = 'mongodb+srv://williambanguera:<password>@cluster0.wvlmezi.mongodb.net/'; 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('BD ONLINE');

 
    io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado:', socket.id);

 
      socket.on('pedido', (pedido) => {
        Pedido.create(pedido)
          .then((pedidoGuardado) => {
            console.log('Pedido guardado', pedidoGuardado);

         
            const coordenada = {
              x: pedido.x,
              y: pedido.y,
              Pedido_id: pedidoGuardado._id,
            };

            Coordenadas.create(coordenada)
              .then((coordenadaGuardada) => {
                console.log('Coordenada guardada', coordenadaGuardada);

              
                socket.emit('coordenada', coordenadaGuardada);
              })
              .catch((error) => {
                console.error('Error al guardar las coordenadas', error);
              });
          })
          .catch((error) => {
            console.error('Error al guardar el pedido', error);
          });
      });
    });

    server.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });
