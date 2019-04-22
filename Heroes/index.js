const express = require("express");

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "DELETE, PUT, GET, POST");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const routes = require('./routes/api');
app.use('/api', routes);


//erorr handling middleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.send({error:err.msg});
});

app.listen(4000, () => console.log(`Example app listening on port ${4000}!`))