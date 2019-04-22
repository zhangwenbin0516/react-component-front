import React from 'react'
import 'themes/register/login.scss'

class LoginComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            form: true,
            userInfo: {},
        }
        this.getForm = this.getForm.bind(this)
        this.getSubmit = this.getSubmit.bind(this)
        this.getData = this.getData.bind(this)
    }

    componentWillMount() {
        this.getForm()
        this.getToken()
    }

    getToken() {
        let self = this;
        let lists = {
            "appType": "pc",
            "appId": "pcWeb",
            "appKey": "e877000be408a6cb0428e0f584456e03"
        }
        fetch.get('token', {
            data: lists
        }).then((res) => {
            let data = res.data || {};
            self.setState({
                token: data.token
            })
            storage.setData('token', data.token)
        }).catch((err) => {
            console.log(err)
        })
    }

    getForm() {
        this.state.form = !this.state.form;
        if (!this.state.form) {
            this.state.FormHint = '手机验证码登录';
            this.state.url = 'login'
            this.state.userInfo = {
                account: '',
                password: ''
            }
        } else {
            this.state.FormHint = '密码登录（手机号码或邮箱）';
            this.state.url = 'mobileLogin'
            this.state.userInfo = {
                mobile: '',
                msgcode: ''
            };
        }
        this.setState({
            FormHint: this.state.FormHint,
            form: this.state.form,
            url: this.state.url,
            userInfo: this.state.userInfo
        })
    }

    getData(event) {
        this.state.userInfo[event.target.name] = event.target.value;
    }

    getSubmit() {
        let Info = this.state.userInfo, self = this;
        if (!this.state.form) {
            this.state.userInfo['token'] = this.state.token;
        }
        for (let index in Info) {
            if (Info[index] === '') {
                alert('数据为空')
                return false;
            }
        }
        fetch.post(this.state.url, this.state.userInfo).then((res) => {
            if (res.data) {
                storage.setData('userInfo', res.data);
                self.props.getUserData()
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return(
            <div className={'register-login'}>
                <div className={'register-login-form'}>
                    <div className={'register-login-top'}>
                        <img src={require('assets/images/logo-login.jpg')} />
                        <div className={'register-login-content'} style={{display: `${!this.state.form ? 'block' : 'none'}`}}>
                            <div className={'register-login-row input'}>
                                <input type={'text'} name={'account'} onChange={this.getData} placeholder={'手机/邮箱/用户名'} />
                            </div>
                            <div className={'register-login-row input'}>
                                <input type={'password'} name={'password'} onChange={this.getData} placeholder={'请输入密码'} />
                            </div>
                        </div>
                        <div className={'register-login-content'} style={{display: `${this.state.form ? 'block' : 'none'}`}}>
                            <div className={'register-login-row input'}>
                                <input type={'text'} name={'mobile'} onChange={this.getData} placeholder={'请输入手机号码'} />
                            </div>
                            <div className={'register-login-row input'}>
                                <input type={'number'} name={'msgcode'} onChange={this.getData} placeholder={'请输入验证码'} />
                            </div>
                        </div>
                        <div className={'register-login-row '}>
                            <button onClick={this.getSubmit}>登录</button>
                        </div>
                        <div className={'register-login-row hint'} onClick={this.getForm}>{this.state.FormHint}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent
