import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import store from 'src/redux/'
import fetch from 'src/request/server'

import Pages from 'src/router/root'
import 'assets/sass/pages.scss'

fetch.post('/userAction/php/oss/GetVideoPlayAuth', {
    videoId: 'd5df9cb979ff4ff2871d5c2d53b68899'
}).then((res) => {
    console.log(res,'ee')
}).catch((res) => {
    console.log(res,'err')
})

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
