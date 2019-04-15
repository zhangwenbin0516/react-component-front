import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider, connect} from 'react-redux'

import Pages from 'src/router/main'
import ReduxReady from 'src/redux/redux'
import 'assets/sass/pages.scss'

class App extends React.Component{
    render() {
        return(
            //<Provider store={ReduxReady} store={ReduxReady}>
                <Pages />
            //</Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))
