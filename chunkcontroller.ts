function SubirVideo(file) {
    var loaded = 0;
    var chunkSize = 500000;
    var total = file.size;
    var reader = new FileReader();
    var slice = file.slice(0, chunkSize);


    reader.readAsBinaryString(slice);
    console.log('Started uploading file "' + file.name + '"');

    reader.onload = function (e) {
        //Just simulate API
        setTimeout(function(){
            loaded += chunkSize;
            var percentLoaded = Math.min((loaded / total) * 100, 100);
            console.log('Uploaded ' + Math.floor(percentLoaded) + '% of file "' + file.name + '"');
            //Read the next chunk and call 'onload' event again
            if (loaded <= total) {
                slice = file.slice(loaded, loaded + chunkSize);
                reader.readAsBinaryString(slice);
            } else {
                loaded = total;
                console.log('File "' + file.name + '" uploaded successfully!');
            }
        }, 250);
    }
    return total;
}
export {SubirVideo}