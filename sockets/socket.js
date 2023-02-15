

const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Sakira' ) );
bands.addBand( new Band( 'Ana Mena' ) );
bands.addBand( new Band( 'One Direction' ) );
bands.addBand( new Band( 'MORAT' ) );
bands.addBand( new Band( 'Metallica' ) );




//MENSAJES DE SICKETS
io.on('connection', client => {     //Computadora que se conecta al servidor
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });     //Notifica cuando el cliente se desconecta

     client.on('mensaje',( paylog ) => {
        console.log('Mensaje ', paylog );

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
     });

     client.on('vote-band', (payload) => {
         console.log(payload);
         bands.voteBand(payload.id);                  //AÑADIR UN VOTO A LA BANDA
         io.emit('active-bands', bands.getBands() );  //ACTUALIZAR LOS DATOS DE LAS BANDAS PARA QUE SE MUESTREN EN A TODOS LOS USUARIOS
     });

     client.on('add-band', ( payload ) =>{
         const newBand = new Band( payload.name );
         bands.addBand( newBand );
         io.emit('active-bands', bands.getBands())
      });
      

     client.on('delete-band', ( payload ) =>{
         bands.deleteBands( payload.id );
         io.emit('active-bands', bands.getBands())
      });

     //client.on('emitir-mensaje', (payload) => {
      //io.emit('nuevo-mensaje', payload)      //EMITE A TODOS
     // client.broadcast.emit('nuevo-mensaje', payload); //EMITE A TODOS MENOS EL QUE LO EMITIO

     //});

  });
