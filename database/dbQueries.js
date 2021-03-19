// const axios = require('axios');
// const config = require('../config.js');
const {db, Question} = require('./index.js')
// console.log('db', db);

const getQnA = {
  getQnA : (req, callback) => {
    // console.log('req.params.product_id', req.params.product_id)
    Question.find({product_id: req.params.product_id}, (err, data) => {
        if (err) console.log(err);
        console.log('data', data);
        callback(null, data);
    })
    // Question.find({product_id: req.params.product_id}, (err, data) => {
    //   if (err) callback(err);
    //   console.log('data', data);
    //   callback(null, data);
    // })

    // console.log('db.collection', db.collection('questions').find())
    // db.questions.find({
    //   product_id: req.params.product_id
    // })
    // db.collection('questions').find();




    // {
    //   "product_id": "5",
    //   "results": [{
    //         "question_id": 37,
    //         "question_body": "Why is this product cheaper here than other sites?",
    //         "question_date": "2018-10-18T00:00:00.000Z",
    //         "asker_name": "williamsmith",
    //         "question_helpfulness": 4,
    //         "reported": false,
    //         "answers": {
    //           68: {
    //             "id": 68,
    //             "body": "We are selling it here without any markup from the middleman!",
    //             "date": "2018-08-18T00:00:00.000Z",
    //             "answerer_name": "Seller",
    //             "helpfulness": 4,
    //             "photos": []
    //             // ...
    //           }
    //         }
    //   }]
    // }
  },

  postQuestion : (req, callback) => {

  },

  postAnswer : (req, callback) => {

  },

  getAnswers : (req, callback) => {

  },

  reportAnswer : (req, callback) => {

  },

  reportQuestion : (req, callback) => {

  },

  voteHelpful : (req, callback) => {

  },

  voteQuestionHelpful : (req, callback) => {

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

module.exports = getQnA