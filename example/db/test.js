module.exports = {
  'post /test 401': {
    msg: 'hello world',
    code: 40001,
  },
  'get /test/list': {
    'list|1-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
      },
    ],
  },
};
