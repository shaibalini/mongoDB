var mongooseDrv = require("mongoose");
var schema = mongooseDrv.Schema;
mongooseDrv.connect('mongodb://localhost:27017/filesDB', { useMongoClient: true });
var connection = mongooseDrv.connection;
 
if (connection !== "undefined") {
    console.log(connection.readyState.toString());
    var path = require("path");
    var grid = require("gridfs-stream");
    var fs = require("fs");
    // var videosrc = path.join(__dirname, "./filestowrite/celibration_write.mp4");
    grid.mongo = mongooseDrv.mongo;
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {
            var fsstreamwrite = fs.createWriteStream(
                path.join(__dirname, "./assets/Screenshot (2).png")
            );
 
            var readstream = gridfs.createReadStream({
                filename: "screenshot(2).png"
            });
            readstream.pipe(fsstreamwrite);
            readstream.on("close", function (file) {
                console.log("File Read successfully from database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
 
    console.log('Sorry not connected');
}
console.log("done");