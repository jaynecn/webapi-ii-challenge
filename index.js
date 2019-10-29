const express = require('express');

const server = express();

// pull in postsRoutes
const postsRoutes = require('./posts/postsRoutes');

server.use(express.json());

server.use('/api/posts', postsRoutes);

server.get('*', handleDefault);
function handleDefault(req, res) {
  res.json('hello everyone this is a server built by jayne')
}

server.listen(process.env.PORT || 7000, () => {
  console.log('listening on jaynes server ' + (process.env.PORT || 7000));
})