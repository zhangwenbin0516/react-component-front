import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch, Link} from "react-router-dom";

import Configs from './config'


class RoutesComponent extends Component{

    render() {
        return(
            <div className={'home'}>
                <Router basename="/">
                    <header>
                        <nav>
                            <Link to={''}>asdasdas</Link>
                            <Link to={'home'}>asdasd111as</Link>
                            {/*{
                                RouteLists.map(({path, name}, index) => {
                                    <Link to={path} key={index}>{name}</Link>
                                })
                            }*/}
                        </nav>
                    </header>
                    <section>
                        <Switch>
                            {
                                Configs.map(({path, component, exact}, index) => {
                                    <Route path={path} getComponent={component} exact={exact}  key={index}></Route>
                                })
                            }
                        </Switch>
                    </section>
                </Router>
            </div>
        )
    }


}

export default RoutesComponent