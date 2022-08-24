// 全局路由文件

export default [
    {
        exact: false, path: '/', component: '@/layouts/index',
        routes: [
            { exact: true, path: '/', component: '@/pages/index' },
            { component: '@/pages/404' },
        ],
    },
]