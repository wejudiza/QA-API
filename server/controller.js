const getProd = require('./dbQueries.js');

const controller = {
/****************QnA methods ***************************/

   //retrieve questions from productId
   getQnA: (req, res) => {
    getQnA.getQnA(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  //post new question
  postQuestion: (req, res) => {
    console.log(req.body)
    getQnA.postQuestion(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //post new answer
  postAnswer: (req, res) => {
    getQnA.postAnswer(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  //get new Answer
  getAnswers: (req, res) => {
    getQnA.getAnswers(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  reportAnswer: (req, res) => {
    getQnA.reportAnswer(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
  reportQuestion: (req, res) => {
    getQnA.reportQuestion(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
  voteHelpful: (req, res) => {
    getQnA.voteHelpful(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
  voteQuestionHelpful: (req, res) => {
    getQnA.voteQuestionHelpful(req, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('NO CONTENT');
      }
    });
  },
}