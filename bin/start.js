const simpleMock = require('../src');
const [dbPath, PROT, prefix, lisShow] = process.argv.slice(2);
// console.log(process.argv);
simpleMock(PROT, dbPath, { prefix, lisShow });
