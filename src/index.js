const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');
const routes = require('./router');

const app = new Koa();

// 默认路径
function defaultDbPath(dbPath) {
  dbPath = dbPath || './db';
  return path.resolve(process.cwd(), dbPath);
}

/**
 * 简单的mock本地服务
 * @param {number} PROT 端口
 * @param {string} dbPath 路径配置
 * @param {object} option 路由配置
 */
const simpleMock = (PROT = 3001, dbPath, option) => {
  option = {
    prefix: '/api',
    listShow: true,
    ...option,
  };
  app.use(cors());
  app.use(routes(defaultDbPath(dbPath), option));

  return app.listen(PROT, () => {
    // eslint-disable-next-line no-console
    console.log('mock 服务器启动完成', `http://localhost:${PROT}`);
  });
};

module.exports = simpleMock;
