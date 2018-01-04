const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.get('/messages/:id', (req, res) => {
  const id = parseInt(req.params.id);

  res.send({
    code: 0,
    data: {
      id: id,
      number: (id * (id + 2)) 
    }
  });
});

server.listen(9999, function () {
  console.log('server listening at port %d', 9999);
  console.log('\n\t#####游戏规则，求值：M(M(M1 + M2 + M3) + M(M4 + M5 + M6) + M(M7 + M8 + M9))');
  console.log('\n\t#####已知条件，M(n)：在http://172.16.15.32:9999/messages/n 的number属性中');
});