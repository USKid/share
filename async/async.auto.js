const request = require('request');
const async = require('async');

function M(n, cb) {
  request(`http://localhost:9999/messages/${n}`, (err, res, body) => {
    if (err) {
      return cb(err)
    } else {
      const result = JSON.parse(body);
      const number = result.data.number;
      return cb(null, number);
    }
  });
}

function getResult(callback) {
  async.auto({
    M1: (cb) => M(1, cb),
    M2: (cb) => M(2, cb),
    M3: (cb) => M(3, cb),
    M4: (cb) => M(4, cb),
    M5: (cb) => M(5, cb),
    M6: (cb) => M(6, cb),
    M7: (cb) => M(7, cb),
    M8: (cb) => M(8, cb),
    M9: (cb) => M(9, cb), 
    M123: ['M1', 'M2', 'M3', (cb, content) => {
      return M(content.M1 + content.M2 + content.M3, cb);
    }],
    M456: ['M4', 'M5', 'M6', (cb, content) => {
      return M(content.M4 + content.M5 + content.M6, cb);
    }],
    M789: ['M7', 'M8', 'M9', (cb, content) => {
      return M(content.M7 + content.M8 + content.M9, cb);
    }],
    M1TO9: ['M123', 'M456', 'M789', (cb, content) => {
      return M(content.M123 + content.M456 + content.M789, cb);
    }]
  }, (err, content) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, content.M1TO9);
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