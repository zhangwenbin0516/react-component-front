/*
* 根目录路由设置
* 主要用作页面重绘
* */
import React, {Component} from 'react'
import {HashRouter as Router ,Route, Switch, } from "react-router-dom";

class MainView extends Component {
    constructor(props) {
        super(props);
    }
    static Routes = [
        {
            path: '/page',
            exact: true,
            icon: '',
            name: '中博教育',
            component: require('page/').default
        },
        {
            path: '/login',
            exact: true,
            icon: '',
            name: '中博教育——登录',
            component: require('page/register/login').default
        },
        {
            path: '/sign',
            exact: true,
            icon: '',
            name: '中博教育——注册',
            component: require('page/register/sign').default
        }
    ]
    componentDidMount() {
        console.log(this)
    }

    render() {
        return(
            <div className="pages">
                <Router basename={'/'}>
                    <Switch>
                        {
                            MainView.Routes.map(({path, exact, component}, index) => {
                                return <Route key={index} path={path} exact={exact} component={component}/>
                            })
                        }
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default MainView
