const http = require('http');

const server = http.createServer((request, response) => {
  response.end('HELLO FROM SERVER');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server is listening to port 8000');
});
