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
 * @param {string} dir 文件相对路径
 * @param {object} option 路由配置
 */
const simpleMock = (PROT = 3001, dir, option) => {
  option = {
    prefix: '/api',
    listShow: true,
    ...option,
  };

  const baseUrl = `http://localhost:${PROT}`;
  app.use(cors());
  app.use(routes(defaultDbPath(dir), baseUrl, option));

  return app.listen(PROT, () => {
    // eslint-disable-next-line no-console
    console.log('mock 服务器启动完成');
  });
};

module.exports = simpleMock;
