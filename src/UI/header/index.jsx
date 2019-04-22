import React from 'react'
import 'themes/header/header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 0,
            download: false,
            userInfo: {
                img: require('assets/images/user-img.jpg'),
                name: '小博',
                infos: false
            }
        }
        this.ExitLogin = this.ExitLogin.bind(this)
    }

    componentWillMount() {
        const userInfo = storage.getData('userInfo')
        if (userInfo) {
            this.state.userInfo.img = baseHost + userInfo.avatar;
            this.state.userInfo.name = userInfo.nickName;
        }
    }

    componentDidMount() {
        let ele = document.querySelector('.users').clientWidth;
        this.setState({
            right: -(ele - 10) + 'px'
        });
    }

    getHost() {
        this.state.history.push('/page/');
        this.state.history.go();
    }

    getUserInfo(self, e) {
        let ele = e.target;
        self.state.userInfo.infos = true;
        self.setState({
            userInfo: self.state.userInfo
        });
        ele.onmouseleave = function() {
            document.body.onclick = function() {
                this.state.userInfo.infos = false;
                ele.onmouseleave = null;
                document.body.onclick = null;
            }
        }
    }

    ExitLogin() {
        let self = this;
        fetch.get('loginOut').then((res) => {
            storage.removeData('userInfo')
            this.props.userInfo.img = require('assets/images/user-img.jpg');
            this.props.userInfo.name = '小博';
            self.setState({
                userInfo: self.state.userInfo
            })
            self.props.onUserData()
        })
    }

    render() {
        return (
            <header className={'pages-header'}>
                <div className={'header-left'} onClick={() => this.getHost(this)}>
                    <img src={require('assets/images/logo.png')} />
                </div>
                <div className={'header-right'}>
                    <div className={'header-right-list player'} style={{backgroundImage: 'url(' + require('assets/images/zb_03.png') + ')'}}>
                        中博直播
                    </div>
                    <div className={'header-right-list icons download'}>
                        <span></span>APP下载
                        <div className={'header-right-download'} style={{right: `${this.state.right}`}}>
                            <div className={'header-right-download-icon'}>
                                <img src={require('assets/images/download-device.png')} />
                                <div className={'row'}>
                                    <p>手机端</p>
                                    <a href={'https://itunes.apple.com/cn/app/id1047754423'} target={'_blank'}>App Store下载</a>
                                    <a href={'https://exstatic.zbgedu.com/upload/admin/201801/ecf75ef40be4e72c5cd04855da307fa4.apk'} target={'_blank'}>Android下载</a>
                                </div>
                                <div className={'row'}>
                                    <p>Pad端</p>
                                    <a href={'https://itunes.apple.com/cn/app/id1319070583'} target={'_blank'}>App Store下载</a>
                                    <a href={'https://exstatic.zbgedu.com/upload/admin/201801/b563012bb0916f1c9b23f96302970d0e.apk'} target={'_blank'}>Android下载</a>
                                </div>
                            </div>
                            <p>扫描二维码，下载中博课堂APP</p>
                        </div>
                    </div>
                    <div className={'header-right-list icons users'}>
                        <span></span>
                        <div className={'header-right-user'} onClick={() => this.getUserInfo(this, event)}>
                            <img src={this.state.userInfo.img} />
                            {this.state.userInfo.name}
                        </div>
                        <div className={'header-right-userInfo'} style={{display: `${this.state.userInfo.infos ? 'block' : 'none'}`}}>
                            <div className={'list'}><a href={'https://www.zbgedu.com/index/Usercenter/index.html'} target={'_blank'}>个人中心</a></div>
                            <div className={'list exit'} onClick={this.ExitLogin}>退出</div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header
