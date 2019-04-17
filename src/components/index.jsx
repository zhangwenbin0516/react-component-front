import React from 'react';
import Header from 'ui/header'
import IndexRouter from 'router/'

class Pages extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header />
                <IndexRouter />
            </div>
        )
    }
}

export default Pages
