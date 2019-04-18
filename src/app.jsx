import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import store from 'src/redux/'

import Pages from 'src/router/root'
import 'assets/sass/pages.scss'


class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Provider store={store}>
                <Pages store={store} />
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))
