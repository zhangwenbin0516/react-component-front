import React from 'react';
import Header from 'ui/header'
import ComponentRouter from 'router/component'

class Pages extends React.Component {
    constructor(props) {
        super(props);
        console.log(this,'ss')
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header />
                <ComponentRouter />
            </div>
        )
    }
}

export default Pages
