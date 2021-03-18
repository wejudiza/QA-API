let {Question, Answer} = require('./index.js')
// Does readstream for you and allow you to pause
let byline = require('byline');
// let LineByLineReader = require('line-by-line');
var fs = require("fs");
var mongoose = require("mongoose");
var path = require('path');
var Schema = mongoose.Schema;
const {exec} = require('child_process');

// allows us to read the questions.csv file
// let stream = new LineByLineReader(path.join(__dirname, '../data/answers_photos1.csv'))
var stream = fs.createReadStream('../data/answers_photos.csv');
stream = byline.createStream(stream);

mongoose.connection.on("open",function(err,conn) {
    console.time('seed')

    // lower level method, needs connection
    // allows to queue up large operations - if you don't queue up you will run out of memory
    var bulk = Question.collection.initializeOrderedBulkOp();
    var counter = 0;

    stream.on("error",function(err) {
        console.log(err); // or otherwise deal with it
    });

    // stream.on("line",function(line) {
    stream.on("data",function(line) {
        // var row = line.split(",");     // split the lines on delimiter
        var row = line.toString('utf-8').split(",")
        var obj = {
          _id: Number(row[0]),
          answer_id: Number(row[1]),
          url: row[2]
        };
        // other manipulation

        //*** bulk.find to find the array and then bulk.update $push
        // bulk.find({ id: Number(row[1]) }).upsert().update( {$push: {photos: obj}})
        // Looks inside each answer, find answer_id
        bulk.find({ answers: { $elemMatch: { _id: Number(row[1]) } } }).updateOne({ $addToSet: { "answers.$.photos": obj } })

        counter++;
        if (counter % 100000 === 0) {
          console.log(counter);
        }

        if ( counter % 1000 === 0 ) {
            stream.pause(); //lets stop reading from file until we finish writing this batch to db
            bulk.execute(function(err,result) {
                if (err) throw err;   // or do something
                // possibly do something with result
                bulk = Question.collection.initializeOrderedBulkOp();

                stream.resume(); //continue to read from file
            });
        }
    });

    stream.on("end",function() {
        if ( counter % 1000 != 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   // or something
                // maybe look at result
                console.log('answer photo seed complete');
                console.timeEnd('seed');
            });
        }
    });
});