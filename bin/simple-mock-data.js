#!/usr/bin/env node
const path = require('path');
const commander = require('commander');
const nodemon = require('nodemon');

const PACKAGR = require('../package.json');

const program = new commander.Command();

program.version(PACKAGR.version, '-v, --version', '输出当前的版本号');

// 初始化
program
  .option('-p, --prot [number]', '端口号', 3001)
  .option('-d, --dir <string>', '路径', './db')
  .option('-P, --prefix <string>', '接口前缀', '/api')
  .option('-ls, --listShow <boolean>', '是否显示接口列表', 1);

program.parse(process.argv);

// 启动简易服务
const { prot, dir, prefix, listShow } = program;
// 文件路径
const dbPath = dir && path.join(process.cwd(), dir);

nodemon({
  exec: `node ${path.resolve(__dirname, './start.js')}`,
  stdout: true,
  watch: [`${dbPath}/**/*`],
  args: [dbPath, prot, prefix, listShow],
}).on('restart', (data) => {
  // eslint-disable-next-line no-console
  console.log('restart', data);
});
