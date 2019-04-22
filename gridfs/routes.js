const express = require("express");
const router = express.Router();
const img=require('./upload');

var imageName;
// router.get('/mobiles/:id', (req, res, next) => {
//     console.log(req.params.id);
//     Mobiles.findById(req.params.id).then(function (mobiles) {
//         res.send(mobiles);
//     }).catch((err) => res.send(err));

// });

router.post('/mobiles/uploadImage/:id', (req, res, next) => {
   
     image=req.params.id;
     img(image)

});


module.exports = router,imageName;