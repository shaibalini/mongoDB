const express=require("express");
const app = express();
const image=require("./routes")
//1. Load the mongoose driver
var mongooseDrv = require("mongoose");
//2. Connect to MongoDB and its database
mongooseDrv.connect('mongodb://localhost:27017/filesDB');
//3. The Connection Object
var connection = mongooseDrv.connection;
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "DELETE, PUT, GET, POST");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const routes=require("./routes");
app.use(routes);

app.use(function(err,req,res,next){
    res.send({error:err.msg});
});

app.listen(5000,()=> console.log(`app is listening on port ${5000}`))


if (connection !== "undefined") {
    console.log(connection.readyState.toString());
    //4. The Path object
    var path = require("path");
    //5. The grid-stream
    var grid = require("gridfs-stream");
    //6. The File-System module
    var fs = require("fs");
    //7.Read the video/image file from the videoread folder
    // var filesrc = path.join(__dirname,"./assets/Screenshot (2).png");
    var filesrc = path.join(__dirname,"./assets/Screenshot (2).png");
    //8. Establish connection between Mongo and GridFS
    grid.mongo = mongooseDrv.mongo;
    //9.Open the connection and write file
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {
            //9a. create a stream, this will be
            //used to store file in database
            var streamwrite = gridfs.createWriteStream({
                //the file will be stored with the name
                filename: "screenshot(2).png"
            });
            //9b. create a readstream to read the file
            //from the filestored folder
            //and pipe into the database
            fs.createReadStream(filesrc).pipe(streamwrite);
            //9c. Complete the write operation
            streamwrite.on("close", function (file) {
                console.log("Write written successfully in database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
 
    console.log('Sorry not connected');
}
console.log("done");

