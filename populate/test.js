var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert')

mongoose.connect('localhost', 'testing_weirdpopulateissue');
mongoose.connection.on('error', function () {
    console.error('connection error', arguments);
  });



var Cal = new Schema({
  creator : { type: Schema.ObjectId, ref: 'User'},
  name : { type: String, index:true },
  description : String,
  events : [{ type: Schema.ObjectId, ref: 'Event'}],
  group: [{ type: Schema.ObjectId, ref: 'Group'}],
  date : { type : Date, default:Date.now }
});
var Calendar = mongoose.model('Calendar', Cal);

var Evt= new Schema({
  creator : { type: Schema.ObjectId, ref: 'User'},
  name : { type: String, index:true },
  description : String,
  attendees : [{ type: Schema.ObjectId, ref: 'User'}],
  calendar : { type: Schema.ObjectId, ref: 'Calendar'},
  date : { type: Date, default: Date.now}
});
var Event = mongoose.model('Event', Evt);

mongoose.connection.on('open', function () {
  var e = new Event({ name: 'weirdpopulateissue' });

  e.save(function (err) {
    if (err) return done(err);

    var cal = new Calendar({ events: [e], name: 'my cal' });
    cal.save(function (err) {
      if (err) return done(err);

      Calendar
      .findOne({ _id: cal._id })
      .populate('events')
      .exec(function (err, data) {
        if (err) return done(err);
        console.error('found', data);
        done();
      });
    })

  })
});

function done (err) {
  if (err) console.error(err.stack);
  mongoose.connection.db.dropDatabase(function () {
    mongoose.connection.close();
  });
}