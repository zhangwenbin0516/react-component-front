import Pages from 'page/home'
import home from 'page/home/home'
const config = [
    {
        path: '/',
        exact: true,
        component: Pages
    },
    {
        path: '/home',
        component: home
    }
]

export default config