function func1(n, callback) {
  stack.push('func1');


  setTimeout(() => {
    stack.push('func1 timeout');
    func2(n, (result) => {
      stack.push('func1 callback')
      return callback(result * 2);
    });
  }, 1000);
}

function func2(n, callback) {
  stack.push('func2');
  setTimeout(() => {
    stack.push('func2 timeout callback');
    callback(n * 4);
  }, 1000);
}

console.log('Main Task Begin');

const stack = [];

stack.push('main');
func1(10, (result) => {
  stack.push('main callback');
  console.log(`End with ${result}`);
  console.log(`The func stack ${JSON.stringify(stack, null, 2)}`);
});



console.log('Main Task finished');





