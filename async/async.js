const request = require('request');
const async = require('async');

function M(n, cb) {
  request(`http://localhost:9999/messages/${n}`, (err, res, body) => {
    if (err) {
      return cb(err)
    } else {
      const result = JSON.parse(body);
      const number = result.data.number;

      setTimeout(() => {
        return cb(null, number);
      }, 100);
    }
  });
}

function getResult(callback) {
  async.waterfall([
    (done) => {
      async.parallel({
        M1: (cb) => M(1, cb),
        M2: (cb) => M(2, cb),
        M3: (cb) => M(3, cb),
        M4: (cb) => M(4, cb),
        M5: (cb) => M(5, cb),
        M6: (cb) => M(6, cb),
        M7: (cb) => M(7, cb),
        M8: (cb) => M(8, cb),
        M9: (cb) => M(9, cb), 
      }, (err, content) => done(err, content));
    },
    (content, done) => {
      async.parallel({
        M123: (cb) => M(content.M1 + content.M2 + content.M3, cb),
        M456: (cb) => M(content.M4 + content.M5 + content.M6, cb),
        M789: (cb) => M(content.M7 + content.M8 + content.M9, cb),
      }, (err, content2) => done(err, content, content2));
    },
    (content, content2, done) => {
      M(content2.M123 + content2.M456 + content2.M789, (err, result) => done(err, result));
    }
  ], (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  });
}

const start = Date.now();
getResult((err, result) => {
  if (err) {
    throw err;
  } else {
    const end = Date.now();
    console.log(`Finial result is ${result}, with ${end - start}`);
  }
});