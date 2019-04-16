import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import Pages from 'src/router/main'
import store from 'src/redux/'
import 'assets/sass/pages.scss'


class App extends React.Component{
    render() {
        return(
            <Provider store={store}>
                <Pages/>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))
