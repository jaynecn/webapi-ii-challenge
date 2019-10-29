const express = require('express');

const server = express();

server.use(express.json());

server.get('*', handleDefault);
function handleDefault(req, res) {
  res.json('hello everyone this is a server built by jayne')
}

server.listen(process.env.PORT || 3300, () => {
  console.log('listening on jaynes server ' + (process.env.PORT || 3300));
})