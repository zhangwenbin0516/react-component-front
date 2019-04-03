import React, {Component} from 'react'
import {HashRouter as Router, Switch, Route} from "react-router-dom";

class MainView extends Component {
    static Routes = [
        {
            path: '/',
            exact: true,
            component: require('page/').default
        }
    ]
    render() {
        return(
            <div className="pages">
                <Router basename='/'>
                    <Switch>
                        {
                            MainView.Routes.map(({path, exact, component}, index) => {
                                return <Route key={index} path={path} component={component} />
                            })
                        }
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default MainView