import React from 'react'
import 'themes/header/header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 0
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        let ele = document.querySelector('.users').clientWidth;
        this.setState({
            right: -(ele - 10) + 'px'
        })
    }

    getHost(self) {
        this.props.history.push('/page/');
        this.props.history.go();
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
                        <div className={'header-right-download'} style={{right: this.state.right}}>
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
                    </div>
                </div>
            </header>
        );
    }
}

export default Header
