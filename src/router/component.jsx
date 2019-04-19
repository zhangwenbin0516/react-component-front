/*
* 左侧菜单路由
* 主要用作内容页面控制
* */
import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from "react-router-dom";


class ComponentRouter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            RouterIndex: 0
        }
        let self = this;
        let Index = null;
        ComponentRouter.Routes.forEach((item, index) => {
            let path = self.props.location.pathname.match(item.path);
            if (path) {
                Index = {
                    path: item.path,
                    value: index
                };
            }
        });
        if (!Index) {
            this.props.history.push('/page/');
            this.props.history.go();
        } else {
            this.state = {
                RouterIndex: Index.value
            }
        }
    }

    static Routes = [
        {
            path: '/',
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

    componentDidMount() {

    }

    getLink(val) {
        this.setState({
            RouterIndex: val
        });
    }

    render() {
        return(
            <article className={'pages-section'}>
                <Router>
                    <aside className="pages-left">
                        <nav>
                            <ul className={'menu'}>
                                {
                                    ComponentRouter.Routes.map(({path, name, icon}, index) => {
                                        return <li onClick={() => {this.getLink(index)}} className={`${icon} ${this.state.RouterIndex == index ? 'active' : ''}`} key={index}>
                                            <Link to={`${this.props.match.path + path}`}>{name}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </nav>
                    </aside>
                    <section className={'pages-content'}>
                        <Switch>
                            {
                                ComponentRouter.Routes.map(({path, exact, component}, index) => {
                                    return <Route key={index} path={`${this.props.match.path + path}`} exact={exact} component={component} />
                                })
                            }
                        </Switch>
                    </section>
                </Router>
            </article>
        )
    }
}

export default withRouter(ComponentRouter)
