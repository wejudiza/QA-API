import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '15s', target: 100 },
    { duration: '15s', target: 1000 },
    { duration: '15s', target: 0 },
  ],
  // vus: 10,
  // duration: '30s',
};

export default function () {
  const url = 'http://localhost:8080/api/qa';

  const responses = http.batch([
    // [
    //   'GET',
    //   `${url}/questions/1`,
    //   null
    // ],
    // [
    //   'GET',
    //   `${url}/questions/500000`,
    //   null
    // ],
    // [
    //   'GET',
    //   `${url}/questions/1000000`,
    //   null
    // ],
    // [
    //   'GET',
    //   `${url}/questions/1/answers`,
    //   null
    // ],
    // [
    //   'GET',
    //   `${url}/questions/500000/answers`,
    //   null
    // ],
    // [
    //   'GET',
    //   `${url}/questions/1000000/answers`,
    //   null
    // ],
    // [
    //   'POST',
    //   `${url}/questions/1`,
    //   null
    // ],
    // [
    //   'POST',
    //   `${url}/questions/500000`,
    //   null
    // ],
    // [
    //   'POST',
    //   `${url}/questions/1000000`,
    //   null
    // ],
    // [
    //   'POST',
    //   `${url}/questions/1/answers`,
    //   null
    // ],
    // [
    //   'POST',
    //   `${url}/questions/500000/answers`,
    //   null
    // ],
    // [
    //   'POST',
    //   `${url}/questions/1000000/answers`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/questions/1/helpful`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/questions/500000/helpful`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/questions/1000000/helpful`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/questions/1/report`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/questions/500000/report`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/questions/1000000/report`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/answers/1/helpful`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/answers/500000/helpful`,
    //   null
    // ],
    // [
    //   'PUT',
    //   `${url}/answers/1000000/helpful`,
    //   null
    // ],
  //   [
  //     'PUT',
  //     `${url}/answers/1/report`,
  //     null
  //   ],
  //   [
  //     'PUT',
  //     `${url}/answers/500000/report`,
  //     null
  //   ],
  //   [
  //     'PUT',
  //     `${url}/answers/1000000/report`,
  //     null
  //   ],
  // ])
  sleep(1)
}

// http.get('http://localhost:8080/api/qa/questions/1000000');
// sleep(1);
// http.get('http://localhost:8080/api/qa/questions/1000000/answers');
// sleep(1);
// http.post('http://localhost:8080/api/qa/questions/1000000');
// sleep(1);
// http.post('http://localhost:8080/api/qa/questions/1000000/answers');
// sleep(1);
// http.put('http://localhost:8080/api/qa/questions/1000000/helpful');
// sleep(1);
// http.put('http://localhost:8080/api/qa/questions/1000000/report');
// sleep(1);
// http.put('http://localhost:8080/api/qa/answers/1000000/helpful');
// sleep(1);
// http.put('http://localhost:8080/api/qa/answers/1000000/report');
// sleep(1);