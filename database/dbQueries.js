// const axios = require('axios');
// const config = require('../config.js');
const {db, Question} = require('./index.js')
// console.log('db', db);

const dbQueries = {
  getQnA : (req, callback) => {
    // console.log('req.params.product_id', req.params.product_id)
    // Question.find({product_id: req.params.product_id, reported: 0}, (err, data) => {
    //     if (err) callback(err);
    //     console.log('data', data);
    //     callback(null, data);
    // })
    Question
      .find({product_id: req.params.product_id, reported: 0})
      .exec(callback);
  },

  postQuestion : (req, callback) => {
    Question
      .create({
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        product_id: req.body.product_id
      })
      .exec(callback)
  },

  postAnswer : (req, callback) => {
    Question
      .create({
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        photos: req.body.photos
      })
      .exec(callback)
  },

  getAnswers : (req, callback) => {
    // console.log('req.params.question_id', typeof(req.params.question_id));
    // Question.find({question_id: Number(req.params.question_id)/*, reported: 0*/}, (err, data) => {
    //   if (err) callback(err);
    //   callback(null, data);
    //  })
    // console.log(Number(req.params.question_id))
    Question
      .find({question_id: Number(req.params.question_id), reported: 0})
      .exec(callback);
  },

  reportAnswer : (req, callback) => {
    // console.log('entering reportAnswer')
    // console.log('req.params.question_id', req.params.question_id)
    // Question
    //   // .findOneAndUpdate({question_id: req.params.question_id, reported: 1/*, reported: 0*/})
    //   .find({question_id: Number(req.params.question_id)})
    //   .updateOne({reported: 1})
    //   // .updateOne({question_id: req.params.question_id, reported: 1})
    //   .exec(callback);
  },

  reportQuestion : (req, callback) => {
    console.log('entering reportQuestion')
    console.log('req.params.question_id', req.params.question_id)
    Question
      // .findOneAndUpdate({question_id: req.params.question_id, reported: 1/*, reported: 0*/})
      .find({question_id: Number(req.params.question_id)})
      .updateOne({reported: 1})
      // .updateOne({question_id: req.params.question_id, reported: 1})
      .exec(callback);
  },

  voteHelpful : (req, callback) => {

  },

  voteQuestionHelpful : (req, callback) => {
    console.log('entering voteQuestionHelpful')
    console.log('req.params.question_id', req.params.question_id)
    Question
      // .find({question_id: Number(req.params.question_id)})
      // .updateOne({$inc: {question_helpfulness: 1}})
      // .findOneAndUpdate({question_id: Number(req.params.question_id)}, {$inc:{question_helpfulness: 1}})
      .findOneAndUpdate({question_id: Number(req.params.question_id)}, {$inc:{question_helpfulness: 1}}, {new: true}, (err, data) => {
        if (err) {
          callback(err)
        } else {
          callback(null, data)
        }
      })
      // .exec(callback);
  }
}


// module.exports = {
//   getQnA,
//   getAnswers,
//   postAnswer,
//   postQuestion,
//   reportAnswer,
//   voteHelpful,
//   voteQuestionHelpful,
//   reportQuestion
// }

module.exports = dbQueries