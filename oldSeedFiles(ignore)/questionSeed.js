let {Question} = require('./index.js')
// let questionsSchema = require('./index.js')
// Does readstream for you and allow you to pause
let LineByLineReader = require('line-by-line');
var fs = require("fs");
var mongoose = require("mongoose");
var path = require('path');
var Schema = mongoose.Schema;
let csv = require('fast-csv');
const {exec} = require('child_process')

// allows us to read the questions.csv file
let stream = new LineByLineReader(path.join(__dirname, '../data/questions.csv'))

mongoose.connection.on("open",function(err,conn) {
    console.time('seed');
    // Deletes database every time before re-importing
    Question.deleteMany({})
      .then((res)=> {
        exec('mongoimport --db qa --collection questions --type csv --file ../data/questions.csv --headerline --numInsertionWorkers 4', (err) => {
          if (err) console.log(err);
          console.log('done');
          mongoose.connection.close();
        })
      })
      .catch((err) => {
        console.log(err);
      })

    // var bulk = Question.collection.initializeOrderedBulkOp();
    // var counter = 0;

    // stream.on("error",function(err) {
    //     console.log(err); // or otherwise deal with it
    // });

    // stream.on("line",function(line) {

    //     var row = line.split(",");     // split the lines on delimiter
    //     var obj = {
    //       id: Number(row[0]),
    //       product_id: Number(row[1]),
    //       body: (row[2]),
    //       date_written: (row[3]),
    //       asker_name: (row[4]),
    //       asker_email: (row[5]),
    //       reported: Number(row[6]),
    //       helpful: Number(row[7]),
    //       answers: []
    //     };
    //     // other manipulation

    //     //*** bulk.find to find the array and then bulk.update $push
    //     bulk.insert(mongoose.model('Question', questionsSchema));  // Bulk is okay if you don't need schema
    //                        // defaults. Or can just set them.

    //     counter++;

    //     if ( counter % 1 === 0 ) {
    //         stream.pause(); //lets stop reading from file until we finish writing this batch to db

    //         bulk.execute(function(err,result) {
    //             if (err) throw err;   // or do something
    //             // possibly do something with result
    //             bulk = Question.collection.initializeOrderedBulkOp();

    //             stream.resume(); //continue to read from file
    //         });
    //     }
    // });

    // stream.on("end",function() {
    //     if ( counter % 1000 != 0 ) {
    //         bulk.execute(function(err,result) {
    //             if (err) throw err;   // or something
    //             // maybe look at result
    //             console.log('questions seed complete');
    //             console.timeEnd('seed');
    //         });
    //     }
    // });

});