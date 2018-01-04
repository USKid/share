const request = require('request');
const co = require('co');

function M(n) {
  return new Promise((resolve, reject) => {
    request(`http://localhost:9999/messages/${n}`, (err, res, body) => {
      if (err) {
        return reject(err)
      } else {
        const result = JSON.parse(body);
        const number = result.data.number;
        return resolve(number);
      }
    });
  });
}

function getResult() {
  return new Promise((resolve, reject) => {
    Promise.all([
        M(1), M(2), M(3), M(4), M(5), M(6), M(7), M(8), M(9)
      ])
      .then((content) => {
        Promise.all([
            M(content[0] + content[1] + content[2]), 
            M(content[3] + content[4] + content[5]), 
            M(content[6] + content[7] + content[8]), 
          ])
          .then((content2) => {
            M(content2[0] + content2[1] + content2[2])
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const start = Date.now();
getResult()
  .then((result) => {
    const end = Date.now();
    console.log(`Finial result is ${result}, with ${end - start}`);
  })
  .catch((err) => {
    throw err;
  });