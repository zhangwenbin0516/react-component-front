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
        this.getUserData = this.getUserData.bind(this)
    }

    componentWillMount() {
        this.getUserData();
    }

    getUserData() {
        const userInfo = storage.getData('userInfo')
        if (!userInfo) {
            this.state.LoginComponent = <Login history={this.props.history} getUserData={this.getUserData} />
        } else {
            this.state.LoginComponent = ''
        }
        this.setState({
            LoginComponent: this.state.LoginComponent,
            userInfo: userInfo
        })
    }

    render() {
        return (
            <div className={'pages-master'}>
                <Header history={this.props.history} onUserData={this.getUserData} userInfo={this.state.userInfo} />
                { this.state.LoginComponent }
                <ComponentRouter />
            </div>
        )
    }
}

export default Pages
