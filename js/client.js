
const socket = io('http://localhost:8000');


// get DOM elements in respective js variables
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container")

//audio for incomming message
var audio = new Audio('ping.mp3')

//function that will apend event event into container
const append = (message, position)=>{
   const messageElement = document.createElement('div');
messageElement.innerText = message;
   messageElement.classList.add('message');
    messageElement.classList.add(position);
   messageContainer.append(messageElement);
   if(position=='left'){
   audio.play();}
  }



  // ask new user for his name and let server know
  const name = prompt("enter your name to join");
  socket.emit('new-user-joined', name);
  

  // if new user joins receive the name from server
  socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
  npm})
  
// if servere sends message receive it
  socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left')
    npm})

    // if user leaves let others know
    socket.on('left', data =>{
      append(`${name} left the chat`, 'right')
      npm})
      
      
      // if form gets submitted send server the message
      form.addEventListener('submit', (e) =>{
        e.preventDefault();
        const message = messageinput.value;
        append(`you: ${message}`, 'right');
        socket.emit('send', message)
        messageinput.value = ''
    
      })