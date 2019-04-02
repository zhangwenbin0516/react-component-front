import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import Pages from 'page/'
import Redux from 'src/redux/redux'
import 'assets/sass/pages.scss'

const store = createStore(reducer);

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