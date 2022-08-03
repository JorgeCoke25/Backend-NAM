const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app)
const io = new Server(server);
const { writeFile } = require('fs');
const bodyParser = require('body-parser');
const ffmpeg = require("ffmpeg");
const tmp = require("tmp");
const fs = require("fs");
const multer = require('multer');
const upload = multer({dest: 'uploads /'}); // los archivos se cargarán en este directorio

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
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: true
}));
let tmpobj = tmp.fileSync({ postfix: '.webm' })

async function convert_images(video_bytes_array){
    fs.writeFileSync(tmpobj.name, video_bytes_array);
    try {
        const process = new ffmpeg(tmpobj.name);
        process.then(function (video) {
            // Callback mode
            video.fnExtractFrameToJPG('./', { // make sure you defined the directory where you want to save the images
                frame_rate : 1,
                number : 10,
                file_name : 'my_frame_%t_%s'
            }, function (error, files) {
                if (!error)
                    tmpobj.removeCallback();
            });
        });
    } catch (e) {
        console.log(e);
    }
}
app.get('/',(req,res)=>{
    res.send('Hola Mundo!');
});
app.post('/upload_chunk',(req,res)=>{
    let timestamp = req.query.timestamp;
    let type = req.query.type;
    console.log(req.body.chunkData)
    res.send(`Chunk recibido:${req.body.chunkData}`)
});

app.post('/upload',(req,res)=>{
    console.log(req.body)
    res.send(`Respuesta: ${req.body}`)
});

//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
server.listen(port,()=>{
    console.log("listening on: "+port)
});