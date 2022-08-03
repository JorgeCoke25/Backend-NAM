const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const { writeFile } = require('fs');

io.on("connection", (socket) => {
    socket.on('uploadVideo', (file, callback) => {
        console.log("xd")
        require("fs").writeFile("out.mp4",file, 'base64', function(err) {
            console.log(err);
        });
    });
    socket.on('uploadPhoto', (file, callback) => {
        require("fs").writeFile("out.jpg",file, 'base64', function(err) {
            console.log(err);
        });
    });
});

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    parameterLimit: 100000,
    extended: true
}));

app.get('/',(req,res)=>{
    res.send('Hola Mundo!');
});
app.post('/upload',(req,res)=>{
    console.log(req.body)
    res.send(`Archivo recibido:${req.body.path}`)
});
app.post('/upload_extra_data',(req,res)=>{
    console.log(req.body)
    res.send(`Chunk recibido:${req.body}`)
});

//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
server.listen(port,()=>{
    console.log("listening on: "+port)
});