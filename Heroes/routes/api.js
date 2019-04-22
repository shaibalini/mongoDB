const express = require("express");
const router = express.Router();
const Hero = require("../models/hero")

router.get('/heroes', (req, res, next) => {
    Hero.find().then(function (hero) {
        res.send(hero);
    }).catch((err)=>res.send(err));

});

router.get('/heroes/:id', (req, res, next) => {
    Hero.findById({ _id: req.params.id }).then(function(hero){
        res.send(hero);
    }).catch((err)=>res.send(err));
});

router.post('/heroes', (req, res, next) => {
    console.log(req.body);
    Hero.create(req.body).then(function (hero) {
        console.log(req.body);
        res.send(hero);
    }).catch((err)=>{
        console.log(err);
    });
});

router.put('/heroes/:no', (req, res, next) => {
    Hero.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (hero) {
        res.send(hero);
    });

});

router.delete('/heroes/:id', (req, res, next) => {
    Hero.findByIdAndRemove({ _id: req.params.id }).then(function (hero) {
        res.send(hero);
    });
});

router.delete('/heroes',(req,res,next)=>{
    Hero.remove();
})

module.exports = router;