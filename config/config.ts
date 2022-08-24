import { defineConfig } from 'umi';
import routes from './routes'

export default defineConfig({
    publicPath:"./",
    layout: {

    },
    dynamicImport: {},
    history: {
        type: 'browser',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    routes,
    fastRefresh: {},
});
