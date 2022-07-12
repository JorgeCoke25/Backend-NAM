const express = require('express');
const cors = require('cors');
const app = express();

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
app.post('/upload_chunk',(req,res)=>{
    let timestamp = req.query.timestamp;
    let type = req.query.type;
    console.log(req.body.chunkData)
    res.send(`Chunk recibido:${req.body.chunkData}`)
});
app.post('/upload_extra_data',(req,res)=>{
    console.log(req.body)
    res.send(`Chunk recibido:${req.body}`)
});
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);