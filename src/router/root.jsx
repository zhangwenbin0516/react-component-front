/*
* 根目录路由设置
* 主要用作页面重绘
* */
import React, {Component} from 'react'
import {BrowserRouter as Router,Route} from "react-router-dom";

class RootRouter extends Component {
    constructor(props) {
        super(props);
    }
    static Routes = {
            path: '/',
            name: '中博教育',
            component: require('router/page').default
    }
    render() {
        return(
            <Router>
                <Route path={RootRouter.Routes.path} component={RootRouter.Routes.component}/>
            </Router>
        )
    }
}

export default RootRouter
