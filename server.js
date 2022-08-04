const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const multer = require('multer')({limits:{fieldSize: 2000000000}});
const fs = require('fs');


io.on("connection", (socket) => {
    socket.on('upload_Video', (file, callback) => {
        console.log(file)
        fs.writeFile("video.mp4",file, 'base64', function(err) {
            console.log(err);
        });
    });
    socket.on('uploadPhoto', (file, callback) => {
        fs.writeFile("out.jpg",file, 'base64', function(err) {
            console.log(err);
        });
    });
});

app.use(cors());
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    parameterLimit: 100000,
    extended: true
}));
app.get('/',(req,res)=>{
    res.send('Hola Mundo!');
});
app.post('/uploadVideo',multer.single('fileFieldName'),async (req, res) => {
/*    const buff = Buffer.from(req.body.VideoRN, 'base64');
    console.log(buff)*/
    console.log((req.body.VideoRN).length)
    await fs.writeFile("out.mp4", req.body.VideoRN, 'base64', function (err) {
        console.log(err)
    });
    res.send(`Video recibido`)
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