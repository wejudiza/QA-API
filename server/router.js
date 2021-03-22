const router = require('express').Router();
const controller = require('./controller');

// /// ///////Questions and Answers///////////
router
  .route('/qa/questions/:product_id')
  .get(controller.getQnA)
  .post(controller.postQuestion);

router
  .route('/qa/questions/:question_id/answers')
  .get(controller.getAnswers)
  .post(controller.postAnswer);

router
  .route('/qa/answers/:answer_id/report')
  .put(controller.reportAnswer)

router
  .route('/qa/answers/:answer_id/helpful')
  .put(controller.voteHelpful)

router
  .route('/qa/questions/:question_id/helpful')
  .put(controller.voteQuestionHelpful)

router
  .route('/qa/questions/:question_id/report')
  .put(controller.reportQuestion)

router
  .route('/qa/test')
  .get(controller.test)

module.exports = router;
