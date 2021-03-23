const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/qareseed', {useNewUrlParser: true, useUnifiedTopology: true});

// Connects to the Docker container's endpoint --> use container name "mongo"
// mongoose.connect('mongodb://mongo:27017/qareseed', {useNewUrlParser: true, useUnifiedTopology: true});

// TEST database running on localhost
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is running')
});

const questionsSchema = new Schema({
  // id: {type: Number, index: {unique: true}},
  question_id: {type: Number, required: true, index: true},
  product_id: {type: Number, required: true, index: true},
  body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  question_helpfulness: Number,
  answers: []
});


const answersSchema = new Schema({
  // id: {type: Number, index: {unique: true}},
  answer_id: {type: Number, required: true, index: true},
  question_id: {type: Number, required: true, index: true},
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
  photos: []
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

