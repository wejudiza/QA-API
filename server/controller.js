const dbQueries = require('../database/dbQueries.js');

const controller = {
/****************QnA methods ***************************/

  //retrieve questions from productId
  getQnA: (req, res) => {
    dbQueries.getQnA(req, (err, data) => {
      console.log('getQnA data', data)
      data = data[0].toJSON()
      console.log('getQnA data', data)
      let formattedData = {
        product_id: data.product_id,
        results: data
      }
      // console.log('data in getQnA', data)
      if (err) {
        res.status(400).send(err);
      } else {
        // res.status(200).send(data);
        res.status(200).send(formattedData);
      }
    });
  },

  //post new question
  postQuestion: (req, res) => {
    console.log(req.body)
    dbQueries.postQuestion(req, (err, data) => {
      // console.log('controller data', data)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //post new answer
  postAnswer: (req, res) => {
    dbQueries.postAnswer(req, (err, data) => {
      // console.log(req.body)
      console.log('data postAnswer', data);
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //get new Answer
  getAnswers: (req, res) => {
    dbQueries.getAnswers(req, (err, data) => {
      // console.log('object.keys', Object.keys(data[0]))
      // console.log('data', data)
      data = data[0].toJSON()
      // data = JSON.parse(JSON.stringify(data[0]));
      let formattedData = {
        question: data.question_id,
        page: 0,
        count: 5,
        results: data.answers
      }
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(formattedData);
      }
    });
  },

  reportAnswer: (req, res) => {
    dbQueries.reportAnswer(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        // res.status(200).send('NO CONTENT');
        res.status(200);
        res.json('Reported Answer');
      }
    });
  },

  reportQuestion: (req, res) => {
    dbQueries.reportQuestion(req, (err, data) => {
      // console.log(req.body)
      console.log('data', data)
      if (err) {
        res.status(400).send(err);
      } else {
        // res.status(200).send('NO CONTENT');
        res.status(200);
        res.json('Reported Question');
      }
    });
  },

  voteHelpful: (req, res) => {
    dbQueries.voteHelpful(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        // res.status(200).send('NO CONTENT');
        res.status(200)
        res.json('Upvoted Answer');
      }
    });
  },

  voteQuestionHelpful: (req, res) => {
    dbQueries.voteQuestionHelpful(req, (err, data) => {
      // console.log('voteQuestionHelpful Data', data)
      // data = data.toJSON();
      if (err) {
        res.status(400).send(err);
      } else {
        // res.status(200).send('NO CONTENT');
        res.status(200)
        res.json('Upvoted Question');
      }
    });
  },

  test: (req, res) => {
    // console.log('Docker server service is working')
    res.status(200).send('Docker server service is working')
  }

}

module.exports = controller