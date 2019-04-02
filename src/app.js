import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import Pages from 'page/'
import 'assets/sass/pages.scss'

class App extends React.Component {
    render() {
        return(
            <div className={'ceshi'}>Hello, World!
                <Pages />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))