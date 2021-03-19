const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/qaformatted', {useNewUrlParser: true, useUnifiedTopology: true});

// TEST database running on localhost
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is running')
});

const questionsSchema = new Schema({
  // id: {type: Number, index: {unique: true}},
  _id: Number,
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number,
});


const answersSchema = new Schema({
  // id: {type: Number, index: {unique: true}},
  _id: Number,
  question_id: Number,
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number
});

const photosSchema = new Schema({
  _id: Number,
  answer_id: Number,
  url: String
})


const Question = mongoose.model('Question', questionsSchema);
const Answer = mongoose.model('Answer', answersSchema);
const Photo = mongoose.model('Photo', photosSchema);

module.exports = {
  Question,
  Answer,
  Photo,
  db
}

