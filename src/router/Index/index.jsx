import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch, Link} from "react-router-dom";

import config from './config'

class Routes extends React.Component{
    constructor() {
        super();
    }
    static RouteList = [
        {
            id: 0,
            path: '/',
            name: '首页'
        },
        {
            id: 1,
            path: '/',
            name: '主页'
        }
    ]
    render() {
        return(
            <div className={'home'}>
                <header>
                    <nav>
                        {
                            Routes.RouteList.map((key) => {
                                <Link to={key.path}>{key.name}</Link>
                            })
                        }
                    </nav>
                </header>
                <Router>

                </Router>

            </div>
        )
    }


}

export default Routes