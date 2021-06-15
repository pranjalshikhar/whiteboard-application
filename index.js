let express = require('express');
let app = express();
let PORT = process.env.PORT || 8080;
let httpServer = require('http').createServer(app)
let io = require('socket.io')(httpServer)
let connections = [];

io.on("connect", (socket) => {
    connections.push(socket);
    console.log(`${socket.id} has connected.`);

    socket.on("disconnect", (reason) => {
        console.log(`${socket.id} has disconnected.`);
        connections = connections.filter((con) => {
            con.id !== socket.id
        })
    })
})

app.use(express.static('public'));

httpServer.listen(PORT, ()=> {
    console.log(`Connected at ${PORT}`);
});