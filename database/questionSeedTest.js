let {Question} = require('./index.js')
// let LineInputStream = require('line-input-stream');
// let LineByLineReader = require('line-by-line');
let byline = require('byline');

var fs = require("fs");
var mongoose = require("mongoose");
var path = require('path');
var Schema = mongoose.Schema;
let csv = require('fast-csv');
const {exec} = require('child_process')

// allows us to read the questions.csv file
// const stream = LineInputStream(fs.createReadStream(path.join(__dirname, '../data/questions.csv')));
// stream.setDelimiter("\n");
// let stream = new LineByLineReader(path.join(__dirname, '../data/questions1.csv'))
var stream = fs.createReadStream('../data/questions.csv');
stream = byline.createStream(stream);

// Remove double quotes from string
var cleanString = (str) => {
    let result = ''
    for (let i = 0; i < str.length; i++) {
        // only add first and last char if it's an alphabet character
        if (i === 0 || i === str.length - 1) {
            // https://coderrocketfuel.com/article/how-to-check-if-a-character-is-a-letter-using-javascript
            if ((/[a-zA-Z]/).test(str[i])) {
                result += str[i]
            }
        } else {
            // other than that use the whole string
            result += str[i]
        }
    }
    return result
}

mongoose.connection.on("open",function(err,conn) {
    console.time('seed');
    // Deletes database every time before re-importing
    // Question.deleteMany({})
    //   .then((res)=> {
    //     exec('mongoimport --db qa --collection questions --type csv --file ../data/questions.csv --headerline --numInsertionWorkers 4', (err) => {
    //       if (err) console.log(err);
    //       console.log('done');
    //       mongoose.connection.close();
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })

    var bulk = Question.collection.initializeOrderedBulkOp();
    var counter = 0;

    stream.on("error",function(err) {
        console.log(err); // or otherwise deal with it
    });
    // For line by line
    // stream.on("line",function(line) {
      stream.on("data",function(line) {

        // var row = line.split(",");     // split the lines on delimiter
        var row = line.toString('utf-8').split(",")
        var obj = {
          question_id: Number(row[0]),
          product_id: Number(row[1]),
          question_body: cleanString(row[2]),
          question_date: cleanString(row[3]),
          asker_name: cleanString(row[4]),
          asker_email: cleanString(row[5]),
          reported: Number(row[6]),
          question_helpfulness: Number(row[7]),
        //   answers: []
        };
        // other manipulation

        //*** bulk.find to find the array and then bulk.update $push
        bulk.insert(obj);  // Bulk is okay if you don't need schema
                           // defaults. Or can just set them.

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
                console.log('questions seed complete');
                console.timeEnd('seed');
                mongoose.connection.close();
            });
        }
    });

});