const http = require('http');

const server = http.createServer((req, res) => {
  // console.log('🚀 ~ app.js:4 ~ res:', res);
  // console.log('🚀 ~ app.js:4 ~ req:', req);

  res.setHeader('type', 'text/html');

  res.write('<h1>This is sent from backend </h1>');

  res.end();
});

server.listen(3000);
