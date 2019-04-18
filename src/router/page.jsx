/*
* 分支路由设置
* 主要用作自定义页面重绘
* */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from "react-router-dom";

class PageRouter extends Component {
    constructor(props) {
        super(props);
        let self = this, location = null;
        let Index = PageRouter.Routes.some((item, index) => {
            let path = self.props.location.pathname.match(item.path)
            if (path) {
                location = item;
                return true;
            }
        });
        if (!Index) {
            this.props.history.push(this.props.match.path + 'page');
            this.props.history.go();
        }
    }
    static Routes = [
        {
            path: 'page',
            icon: '',
            exact: true,
            name: '中博教育',
            component: require('page/index').default
        },
        {
            path: 'register',
            icon: '',
            exact: false,
            name: '中博教育',
            component: require('page/register/').default
        }
    ]
    render() {
        return(
            <div className="pages">
                <Router>
                    <Switch>
                        {
                            PageRouter.Routes.map(({path, exact, component}, index) => {
                                return <Route key={index} path={`${this.props.match.path + path}`} component={component} />
                            })
                        }
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default withRouter(PageRouter)
