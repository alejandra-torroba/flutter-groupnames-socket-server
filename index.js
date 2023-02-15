const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

//SERVIDOR DE SOCKET.IO
    //Crear servidor
const server = require('http').createServer(app);
    //Conficuración del servidor
module.exports.io = require('socket.io')(server);

//MENSAJES DE SICKETS
require('./sockets/socket');


//PATH PUBLICO
const publicPath = path.resolve(__dirname, 'public');

app.use( express.static(publicPath));


server.listen(process.env.PORT, (err)=> {
    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});
