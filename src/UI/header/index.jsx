import React from 'react'

import 'themes/header/header.scss';

class Header extends React.Component {
    gettest() {

    }
    render() {
        return (
            <header className={'pages-header'}>
                <div className={'header-left'}>
                    <img src={require('assets/images/logo.png')} />
                </div>
                <div onClick={this.gettest} className={'sss'}>saajsoasjdoa</div>
            </header>
        );
    }
}

export default Header;
