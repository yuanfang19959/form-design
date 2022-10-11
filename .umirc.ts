import { defineConfig } from 'umi';
// import routes from './routes'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  //   routes,
  fastRefresh: {},
  proxy: {
    '/nimabi': {
      target: 'https://wt.linanwater.com/',
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/nimabi': '' }, // 将请求url里的ci去掉
    },
  },
});
