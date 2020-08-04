/*
 * @Description: 路由配置
 * @Author: ontheroad1992
 * @Date: 2020-02-21 17:38:36
 * @LastEditors: ontheroad1992
 * @LastEditTime: 2020-08-04 17:08:45
 */
const Router = require('koa-router');
const Mock = require('mockjs');
const fs = require('fs');

module.exports = (routePath, baseUrl, { prefix, listShow }) => {
  const router = new Router({
    prefix,
  });

  // 获取路径下的模拟数据
  // 导入路由
  fs.readdirSync(routePath)
    .map((item) => require(require.resolve(`${routePath}/${item}`)))
    .forEach((module) => {
      Object.keys(module).forEach((item) => {
        const [method, route, state = 200] = item.split(' ').filter((item) => item !== '');
        // eslint-disable-next-line no-console
        if (listShow) console.log('mock 接口:', `${method.toLocaleUpperCase()} ${baseUrl}${prefix}${route}`);
        router[method.toLocaleLowerCase()](route, async (ctx) => {
          ctx.response.status = parseInt(state);
          ctx.body = Mock.mock(module[item]);
        });
      });
    });

  return router.routes();
};
