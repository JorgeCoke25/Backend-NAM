const express = require('express');
const app = express;
const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get("/enviarVideo", async (req,res)=>{
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath= "4K.mp4";
    const videoSize= fs.statSync("4K.mp4").size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206,headers);
    const videoStream = fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res);
})

io.on("connection", (socket)=>{

})
app.get("/",async (req,res)=>{
    res.send('<h1>Hola Mundo</h1>')
})
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);