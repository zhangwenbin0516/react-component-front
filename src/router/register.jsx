/*
* 登录注册路由设置
* */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";

class RegisterRouter extends Component {
    constructor(props) {
        super(props);
        let self = this, location = null;
        let Index = RegisterRouter.Routes.some((item, index) => {
            let path = self.props.location.pathname.match(item.path)
            if (path) {
                location = item;
                return true;
            }
        })
        if (!Index) {
            this.props.history.push('/register/login');
        }
    }
    static Routes = [
        {
            path: '/login',
            icon: '',
            exact: true,
            name: '中博教育——登录',
            component: require('page/register/login').default
        },
        {
            path: '/sign',
            icon: '',
            exact: false,
            name: '中博教育——注册',
            component: require('page/register/sign').default
        }
    ]
    render() {
        return(
            <div className={'register'}>
                <Router>
                    <Switch>
                        {
                            RegisterRouter.Routes.map(({path, exact, component}, index) => {
                                return <Route key={index} path={`${this.props.match.path + path}`} exact={exact} component={component} />
                            })
                        }
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default withRouter(RegisterRouter)
