// jest(单元测试) 是基于Node环境,只支持 CommonJS,需要编译执行ESM(ES模块)
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  };