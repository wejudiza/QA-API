const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/qa', {useNewUrlParser: true, useUnifiedTopology: true});

// TEST database running on localhost
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is running')
});

const questionsSchema = new Schema({
  id: Number /*{type: Number, index: {unique: true}}*/,
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number,
});


const answersSchema = new Schema({
  id: {type: Number, index: {unique: true}},
  question_id: Number,
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number
});

const photosSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
})


// const array = new Schema({
//   questions:[],
//   answers: [],
// })

const Question = mongoose.model('Question', questionsSchema);
const Answer = mongoose.model('Answer', answersSchema);
const Photo = mongoose.model('Photo', photosSchema);

// Question.createCollection();
// Answer.createCollection();
// Photo.createCollection();

// Photo.create({
//   id: 123,
//   answer_id: 456,
//   url: 'url'
// })

module.exports = {
  Question,
  Answer,
  Photo
}
// module.exports = questionsSchema;
