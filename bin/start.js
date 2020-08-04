const simpleMock = require('../src');
const [PROT, dir, prefix, listShow] = process.argv.slice(2);
// console.log(process.argv);
simpleMock(PROT, dir, { prefix, listShow: Boolean(parseInt(listShow)) });
