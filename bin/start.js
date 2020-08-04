const simpleMock = require('../src');
const [dbPath, PROT, prefix, listShow] = process.argv.slice(2);
// console.log(process.argv);
simpleMock(PROT, dbPath, { prefix, listShow });
