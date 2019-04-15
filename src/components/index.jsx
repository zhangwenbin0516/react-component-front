import React from 'react'
//import RouterView from 'src/router'

class Pages extends React.Component{
    constructor() {
        super();
    }
    static userInfo = {
        "isAvatar" : true,
        "token" : "dd68b8cb-9c9c-4da4-9d24-7cbc92006d41",
        "nickName" : "zpk",
        "memberId" : "ff8080815133db0d0151375bfdf30c0d",
        "avatar" : "/upload/avatar/big_ff8080815133db0d0151375bfdf30c0d.jpg",
    }
    componentWillMount() {
        let self = this;
        this.getData({
            type: 'post',
            url: '/api/userAction/php/oss/GetVideoPlayAuth',
            data: {
                videoId: 'b713d9cddb0f4faba50d073788409392',
                //token: Pages.userInfo.token
            },
            success: (res) => {
                self.setState({
                    playData: JSON.parse(res).data
                })
                self.getPlay();
            },
            error: (res) => {

            }
        })
    }
    getPlay() {
        console.log(this.state)
        this.play = new Aliplayer({
            id: 'J_prismPlayer',
            width: '100%',
            autoplay: true,
            useFlashPrism: true,
            useH5Prism: false,
            source : 'https://outin-53795a3a583a11e9b00500163e1c91c8.oss-cn-shanghai.aliyuncs.com/586aa50b8e6f46e89344c364acb57293/9b575775cf4a4133a84f537d2cb9fe0b-6f1b5a73f814e82f6caecad5cbbde505-ld.mp4?Expires=1555329410&OSSAccessKeyId=LTAItL9Co9nUDU5r&Signature=wsqT5wHN5GiTbSOxDZ4Da0uBKok%3D',
            //vid : `${this.state.playData.VideoId}`,
            //playauth : `${this.state.playData.PlayAuth}`,
            //cover: this.state.playData.CoverURL,
        })
    }
    getData(lists) {
        let xhr;
        const Format = (data) => {
            let formData = new FormData();
            if (data) {

                for (let i in data) {
                    formData.append(i, data[i]);
                }
                return formData;
            } else {
                return null;
            }
        }
        const promise = new Promise((resolve, reject) => {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } else {
                xhr = new XMLHttpRequest();
            }
            lists.type = lists.type.toLocaleUpperCase() || 'GET';
            xhr.open(lists.type, lists.url + '?verTT=' + new Date().getTime(), true);
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.responseText);

            xhr.send(Format(lists.data));
        });

        promise.then((res) => {
            lists.success(res);
        }).catch((res) => {
            lists.error(res)
        });
    }
    render() {
        return(
            <div className={'homepage'}>
                <div className="prism-player" id="J_prismPlayer" style={{width: '600px', height: '400px',background: 'red'}}></div>
            </div>
        )
    }
}

export default Pages
