const express = require('express');
const mongoose = require('mongoose');
const {UploadVideo, SubirVideo} = require("./chunkcontroller");

const app = express();
// a test route to make sure we can reach the backend
//this would normally go in a routes file

mongoose.connect("mongodb+srv://jorge:1234@cluster0.yj9r6pq.mongodb.net/?retryWrites=true&w=majority", (req,res)=>{
    console.log("conectado a la base de datos")
})
app.post("/enviarVideo", async (req,res)=>{
    try {
        const video = SubirVideo(req.body)
    }catch (error){
        console.log(error)
    }
})
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);