import React from 'react'
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom";

class RouterView extends React.Component{
    static Routes = [
        {
            path: '/',
            name: '首页',
            exact: true,
            component: require('page/home').default
        },
        /*{
            path: '/home',
            name: '子首页',
            component: require('page/home/home').default
        }*/
    ]
    render() {
        return(
            <div className="pages">
                <Router basename="/">
                    <header>
                        <nav>
                            <ul>
                                {
                                    RouterView.Routes.map(({path, name}, index) => {
                                        return  <li key={index}><Link to={path}>{name}</Link></li>
                                    })
                                }
                            </ul>
                        </nav>
                    </header>
                    <section>
                        {
                            RouterView.Routes.map(({path, component, exact}, index) => {
                                return  <Route key={index} path={path} component={component} exact={exact} />
                            })
                        }
                    </section>
                </Router>
            </div>
        )
    }
}

export default RouterView
