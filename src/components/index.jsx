import React from 'react';
import Header from 'ui/header'
import ComponentRouter from 'router/component'

class Pages extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header history={this.props.history} />
                <ComponentRouter />
            </div>
        )
    }
}

export default Pages
