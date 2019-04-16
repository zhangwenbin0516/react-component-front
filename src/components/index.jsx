import React from 'react';
import Header from 'ui/header'
import AsideNav from 'ui/home/left'
import SectionContent from 'ui/home/right'

class Pages extends React.Component {
    constructor() {
        super();
        console.log(this)
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header />
                <article className={'pages-section'}>
                    <AsideNav />
                    <SectionContent/>
                </article>
            </div>
        )
    }
}

export default Pages
