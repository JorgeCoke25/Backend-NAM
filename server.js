const express = require('express');
const cors = require('cors');
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));

app.get('/',(req,res)=>{
    res.send('Hola Mundo!');
});
app.post('/upload_chunk',(req,res)=>{
    let timestamp = req.query.timestamp;
    let type = req.query.type;
    console.log(req.body.chunkData)
    res.send(`Chunk recibido:${req.body.chunData}`)
});
app.post('/upload_extra_data',(req,res)=>{
    console.log(req.body)
    res.send(`Chunk recibido:${req.body}`)
});
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);