const RootRoutes = {
    type: 'RootRoutes',
    lists: [
        {
            path: '/',
            exact: true,
            icon: '',
            name: '中博教育',
            component: require('page/').default
        }
    ]
};

const MenuRoutes = {
    type: 'MenuRoutes',
    lists: [
        {
            path: '/Index',
            name: '首页',
            exact: true,
            icon: 'home',
            component: require('page/home/').default
        },
        {
            path: '/course',
            name: '我的课程',
            icon: 'course',
            exact: false,
            component: require('page/course/').default
        },
        {
            path: '/Information',
            name: '题库',
            icon: 'Information',
            exact: false,
            component: require('page/Information/').default
        },
        {
            path: '/record',
            name: '做题记录',
            icon: 'record',
            exact: false,
            component: require('page/record/').default
        },
        {
            path: '/note',
            name: '我的笔记',
            icon: 'note',
            exact: false,
            component: require('page/note/').default
        },
        {
            path: '/exchange',
            name: '我的交流',
            icon: 'exchange',
            exact: false,
            component: require('page/exchange/').default
        },
        {
            path: '/help',
            name: '我的帮助',
            icon: 'help',
            exact: false,
            component: require('page/help/').default
        }
    ]
}

export default {
    RootRoutes,
    MenuRoutes
}
