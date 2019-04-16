import React from 'react';
import Header from 'ui/header'
import Section from './Index/'

class Pages extends React.Component {
    constructor() {
        super();
        console.log(this)
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header />
                <section className={'pages-section'}>

                </section>
            </div>
        )
    }
}

export default Pages
