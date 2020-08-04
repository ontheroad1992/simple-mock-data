const path = require('path');
const simpleMock = require('../src');

simpleMock(3002, path.resolve(__dirname, './db'), {
  prefix: '/apii',
  listShow: false
});
