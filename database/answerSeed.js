let {Question, Answer} = require('./index.js')
let byline = require('byline');
var fs = require("fs");
var mongoose = require("mongoose");
var path = require('path');
var Schema = mongoose.Schema;

var stream = fs.createReadStream('../data/answers.csv');
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
    console.time('seed')
    console.log('starting');
    // lower level method, needs connection
    // allows to queue up large operations - if you don't queue up you will run out of memory
    var bulk = Question.collection.initializeOrderedBulkOp();
    var counter = 0;

    stream.on("error",function(err) {
        console.log(err); // or otherwise deal with it
    });

    stream.on("data",function(line) {
        // var row = line.split(",");     // split the lines on delimiter
        var row = line.toString('utf-8').split(",")
        var obj = {
            answer_id: Number(row[0]),
            question_id: Number(row[1]),
            body: cleanString(row[2]),
            date: cleanString(row[3]),
            answerer_name: cleanString(row[4]),
            answerer_email: cleanString(row[5]),
            reported: Number(row[6]),
            helpfulness: Number(row[7]),
            photos: []
        };
        // other manipulation

        bulk.find({ question_id: Number(row[1]) }).upsert().update( {$push: {answers: obj}})

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
        console.log('reached end');
        if ( counter % 1000 != 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   // or something
                // maybe look at result
                console.log('answers seed complete');
                console.timeEnd('seed');
                mongoose.connection.close();
            });
        }
    });
});