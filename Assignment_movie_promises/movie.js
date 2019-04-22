function movie(mName,mDuration,mRating,mGenre,isMovieGood){
    this.mName=mName;
    this.mDuration=mDuration;
    this.mRating=mRating;
    this.mGenre=mGenre;
    this.isMovieGood=isMovieGood;
}
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Create a new MongoClient
const client = new MongoClient(url);
