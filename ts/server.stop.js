const io = require('socket.io-client');
const socketClient = io('http://127.0.0.1:1234',  { transports: ["websocket"] }); // Specify port if your express server is not using default port 80

socketClient.on('ack', function(received) {
  console.log('Download completed');
  process.exit();
});

socketClient.on('disconnect',() => {
  process.exit();
});

socketClient.on('connect', () => {
 // setTimeout(() => {
 //   process.exit();
 // }, 1000);
 //setTimeout((function() {
 // socketClient.off("x");
 // return process.kill(process.pid);
//}), 1000);
  //console.log('Download completed');
  socketClient.emit('EIO=4');
//  alert("<emit>");
 // process.exit(); 
  //alert("would exit");
});