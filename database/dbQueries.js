const {db, Question, Answer, Photo} = require('./index.js')

// Formats date to YYYY-MM-DD
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

// Generated random number for question_id
// const getNumber = (callback) => {
//   var n = Math.floor(Math.random()*1000000000);
//   Question.findOne({'question_id': n}, function(err, result){
//       if (err) callback(err);
//       else if (result) return getNumber(callback);
//       else callback(null, n);
//   });
// }

// const test = getNumber(function(error, number){
//   console.log(number);
// });


const dbQueries = {
  getQnA : (req, callback) => {
    Question
      .find({product_id: req.params.product_id/*, reported: 0*/})
      .exec(callback);
  },

  postQuestion : (req, callback) => {
    // let newQuestion = new Question({
    //   question_id: Math.floor(Math.random()*1000000000),
    //   product_id: req.body.product_id,
    //   body: req.body.body,
    //   question_date: formatDate(new Date()),
    //   asker_name: req.body.name,
    //   asker_email: req.body.email,
    //   reported: 0,
    //   question_helpfulness: 0,
    //   answers: []
    // })

    // console.log('newQuestion', newQuestion);

    // newQuestion.save((err, data) => {
    //   // console.log('entering newQuestion.save')
    //   console.log('data', data)
    //   if (err) callback (err)
    //   callback(null, data)
    // })
    Question
      .create({
        question_id: Math.floor(Math.random()*1000000000),
        product_id: req.body.product_id,
        body: req.body.body,
        question_date: formatDate(new Date()),
        asker_name: req.body.name,
        asker_email: req.body.email,
        reported: 0,
        question_helpfulness: 0,
        answers: []
      }, (err, data) => {
        if (err) callback(err)
        callback(null, data)
      })
  },

  postAnswer : (req, callback) => {
    console.log('req.params.question_id', req.params.question_id);
    var newAnswer_id = Math.floor(Math.random()*1000000000)
    var photosArr = []
    for (var i = 0; i < req.body.photos.length; i++) {
      let newPhoto = new Photo({
        _id: Math.floor(Math.random()*1000000000),
        answer_id: newAnswer_id,
        url: req.body.photos[i]
      })
      photosArr.push(newPhoto);
    }


    let newAnswer = new Answer({
      answer_id: newAnswer_id,
      question_id: req.params.question_id,
      body: req.body.body,
      date_written: formatDate(new Date()),
      answerer_name: req.body.name,
      answerer_email: req.body.email,
      reported: 0,
      helpful: 0,
      photos: photosArr
    })

    console.log('newAnswer', newAnswer);

    Question
      .update(
        {question_id: Number(req.params.question_id)},
        {$push: {answers: newAnswer}},
        (err, data) => {
          if (err) callback(err)
          callback(null, data)
        }
      )

    // Question
    // .find(
    //   {question_id: 1},
    // )
    // .then((results) => {
    //   var jsonObj = results[0].toJSON()
    //   console.log('jsonObj.answers', jsonObj.answers) //> actually gives me my answers array
    // })
  },

  getAnswers : (req, callback) => {
    Question
      .find({question_id: Number(req.params.question_id)/*, reported: 0}*/})
      .exec(callback);
  },

  reportAnswer : (req, callback) => {
    console.log('entering reportAnswer')
    console.log('req.params.answer_id', req.params.answer_id)
    Question
      .findOneAndUpdate(
        { answers: { $elemMatch: {answer_id: Number(req.params.answer_id)} }},
        { $set: {"answers.$.reported": 1}},
        {new: true},
        (err, data) => {
          if (err) callback(err)
          else callback(null, data)
        }
      )
      .exec(callback);
  },

  voteHelpful : (req, callback) => {
    console.log('entering voteHelpful')
    console.log('req.params.answer_id', req.params.answer_id)
    // Question
    //   .findOneAndUpdate(
    //     { answers: { $elemMatch: {answer_id: Number(req.params.answer_id)} }},
    //     { $inc: {"answers.$.helpfulness": 1}}
    //   )
    //   .exec(callback);
    // Question
    //   .find({
    //     answers: {$elemMatch: {answer_id: 5}}
    //   })
    //   .then((results) => {
    //     let obj = results[0]
    //     // Find appropriate answer
    //     obj = obj.toJSON();
    //     console.log('obj.answers', obj.answers)
    //     obj.answers.forEach((answer => {
    //       if (answer.answer_id === 5) {
    //         answer.helpfulness += 1
    //       }
    //     }))
    //     // console.log(obj.answers)
    //     console.log(obj._id)
    //     // Question.updateOne({
    //     //   question_id: obj.question_id
    //     // }, obj, (err, result) => {
    //     //   console.log('err', err);
    //     //   console.log('result', result);
    //     // })
    //     delete obj._id
    //     Question
    //       .findOneAndUpdate(
    //         { answers: { $elemMatch: {answer_id: 5} }},
    //         { $set: {answers: obj.answers}}
    //       )
    //       .exec(callback);
    //       })
    Question
      .findOneAndUpdate(
        { answers: {$elemMatch: {answer_id: Number(req.params.answer_id)}}},
        {$inc: {"answers.$.helpfulness": 1}},
        (err, data) => {
          if (err) callback(err)
          else callback(null, data)
      })
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

  voteQuestionHelpful : (req, callback) => {
    console.log('entering voteQuestionHelpful')
    console.log('req.params.question_id', req.params.question_id)
    Question
      .findOneAndUpdate({question_id: Number(req.params.question_id)}, {$inc:{question_helpfulness: 1}}, {new: true}, (err, data) => {
        if (err) {
          callback(err)
        } else {
          callback(null, data)
        }
      })
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