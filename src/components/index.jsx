import React from 'react';
import Header from 'ui/header'
import Login from 'ui/register/login'
import ComponentRouter from 'router/component'

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginComponent: ''
        }
    }

    componentWillMount() {
        this.getUserData();
        storage.updateData()
    }

    getUserData() {
        this.setState({
            isLogin: storage.getData('userInfo')
        })
        if (this.state.isLogin) {
            this.state.LoginComponent = <Login isLogin={this.getUserData}/>
        }
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header history={this.props.history} isLogin={this.getUserData} />
                { this.state.LoginComponent }
                <ComponentRouter />
            </div>
        )
    }
}

export default Pages
