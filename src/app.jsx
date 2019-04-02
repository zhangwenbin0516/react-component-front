import 'babel-polyfill'
import React, {Component} from 'react'
import ReactDom, {render} from 'react-dom'
import {Provider, connect} from 'react-redux'

import Pages from 'page/'
import ReduxReady from 'src/redux/redux'
import 'assets/sass/pages.scss'

class App extends React.Component{
    render() {
        return(
            //<Provider store={ReduxReady}>
                <Pages/>
            //</Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))