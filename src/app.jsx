import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import store from 'src/redux/'
import fetch from 'src/request/server'
import storage from 'src/request/storage'

window.fetch = fetch
window.storage = storage

import Pages from 'src/router/root'
import 'assets/sass/pages.scss'


class App extends React.Component{
    constructor(props) {
        super(props);
        let location = window.location.href;
        if (location.match('www.zbgedu.com')) {
            window.baseHost = 'https://www.zbgedu.com'
        } else {
            window.baseHost = 'https://elearningdemo.zbgedu.com'
        }
        let er = {a: 1, n: 3};
    }

    componentWillMount() {
        store.dispatch({type: 'USERINFO', payload: {name: '2342'}})
        console.log(store.getState())
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
