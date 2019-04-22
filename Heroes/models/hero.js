const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const HeroSchema=new Schema({
    heroName:{
        type:String,
        required:[true]
    },
    heroHeight:{
        type:Number,
        required:[true]
    },
    heroType:{
        type:Boolean,
        required:[true]
    },
    canFly:{
        type:Boolean,
        required:[true]
    },
    fanFollowing:{
        type:Number,
        required:[true]
    },
    superPower:{
        type:String,
        
    },
    fightsWon:{
        type:Number,
        required:[true]
    }
})
const Hero=mongoose.model('Heroes',HeroSchema);
module.exports=Hero;