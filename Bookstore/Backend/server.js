'use strict';

const app = require('./routeHandler');
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`The server is up and running port ${PORT}`);
});