//node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    } 
  });
const users = {};


 io.on('connection', socket =>{
   // if any new user joins let other know that he joined
     socket.on('new-user-joined', name =>{
        // console.log("new-user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     // if someone sends a message send it to other people except him that is broadast
     socket.on('send', message =>{
         socket.broadcast.emit('receive',
          {message: message, name: users[socket.id]})
     });


     //is someone leasves then let other know
     socket.on('disconnect', message =>{
      socket.broadcast.emit('left',
       users[socket.id]);
       delete users[socket.id];
  });
     
 }) 
