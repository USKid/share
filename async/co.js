const request = require('request');
const co = require('co');

function* M(n) {
  return yield new Promise((resolve, reject) => {
    request(`http://localhost:9999/messages/${n}`, (err, res, body) => {
      if (err) {
        return reject(err)
      } else {
        const result = JSON.parse(body);
        const number = result.data.number;

        setTimeout(() => {
          resolve(number);
        }, 100);
      }
    });
  });
}

function* getResult(callback) {
  const M1 = yield M(1);
  const M2 = yield M(2);
  const M3 = yield M(3);
  const M4 = yield M(4);
  const M5 = yield M(5);
  const M6 = yield M(6);
  const M7 = yield M(7);
  const M8 = yield M(8);
  const M9 = yield M(9);
  const M123 = yield M(M1 + M2 + M3);
  const M456 = yield M(M4 + M5 + M6);
  const M789 = yield M(M7 + M8 + M9);
  return yield M(M123 + M456 + M789);
}

const start = Date.now();
co(function* () {
    return yield getResult();
  })
  .then((result) => {
    const end = Date.now();
    console.log(`Finial result is ${result}, with ${end - start}`);
  })
  .catch((err) => {
    throw err;
  });