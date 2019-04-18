import React from 'react';
import Header from 'ui/header'
import RegisterRouter from 'router/register'

class Pages extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header />
                <RegisterRouter />
            </div>
        )
    }
}

export default Pages
