/*
* 左侧菜单路由
* 主要用作内容页面控制
* */
import React from 'react'
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom";

class RouterView extends React.Component{
    constructor(props) {
        super(props)
    }
    static Routes = [
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
    render() {
        return(
            <article className={'pages-section'}>
                <Router basename="/">
                    <aside className="pages-left">
                        <nav>
                            <ul className={'menu'}>
                                {
                                    RouterView.Routes.map(({path, name, icon, exact}, index) => {
                                        return <li className={`${icon} ${exact ? 'active' : ''}`} key={index}>
                                            <Link to={path}>{name}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </nav>
                    </aside>
                    <section className={'pages-content'}>
                        <Switch>
                            {
                                RouterView.Routes.map(({path, component, exact}, index) => {
                                    return  <Route key={index} path={path} component={component} exact={exact} />
                                })
                            }
                        </Switch>
                    </section>
                </Router>
            </article>
        )
    }
}

export default RouterView
