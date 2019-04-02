const RouteLists = [
    {
        path: '',
        name: '首页',
        exact: true,
        component: require('page/home').default
    },
    {
        path: 'home',
        name: '主页',
        component: require('page/home/home').default
    }
]

export default RouteLists