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

const dbQueries = {
  getQnA : (req, callback) => {
    Question
      .find({product_id: req.params.product_id/*, reported: 0*/})
      .exec(callback);
  },

  getAnswers : (req, callback) => {
    Question
      .find({question_id: Number(req.params.question_id)/*, reported: 0}*/})
      .exec(callback);
  },

  postQuestion : (req, callback) => {
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
    var newAnswer_id = Math.floor(Math.random()*1000000000)
    var photosArr = []
    // *** Since there is no photos array if the original answer does not have any photos,
    // req,body.photos would be undefined so we need to check for it
    if (req.body.photos) {
      for (var i = 0; i < req.body.photos.length; i++) {
        var newPhoto = new Photo({
          _id: Math.floor(Math.random()*1000000000),
          answer_id: newAnswer_id,
          url: req.body.photos[i]
        })
        photosArr.push(newPhoto);
      }
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

    // console.log('newAnswer', newAnswer);

    Question
      .update(
        {question_id: Number(req.params.question_id)},
        {$push: {answers: newAnswer}},
        (err, data) => {
          if (err) callback(err)
          callback(null, data)
        }
      )
  },

  reportAnswer : (req, callback) => {
    Question
      .findOneAndUpdate(
        {answers: { $elemMatch: {answer_id: Number(req.params.answer_id)} }},
        {$set: {"answers.$.reported": 1}},
        {new: true},
        (err, data) => {
          if (err) callback(err)
          else callback(null, data)
        }
      )
  },

  voteHelpful : (req, callback) => {
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
        {answers: {$elemMatch: {answer_id: Number(req.params.answer_id)}}},
        {$inc: {"answers.$.helpfulness": 1}},
        (err, data) => {
          if (err) callback(err)
          else callback(null, data)
      })
  },

  reportQuestion : (req, callback) => {
    Question
      .findOneAndUpdate(
        {question_id: Number(req.params.question_id)},
        {$set: {reported: 1}},
        {new: true},
        (err, data) => {
          if (err) callback(err)
          else callback(null, data)
        }
      )

    // Question
      // .find({question_id: Number(req.params.question_id)})
      // .updateOne({reported: 1})
      // .exec(callback);
  },

  voteQuestionHelpful : (req, callback) => {
    Question
      .findOneAndUpdate(
        {question_id: Number(req.params.question_id)},
        {$inc:{question_helpfulness: 1}},
        {new: true},
        (err, data) => {
          if (err) {
            callback(err)
          } else {
            callback(null, data)
          }
      })
  }
}

module.exports = dbQueries