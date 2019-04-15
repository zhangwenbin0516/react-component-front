import React from 'react'
//import RouterView from 'src/router'

class Pages extends React.Component{
    constructor() {
        super();
        this.state = {
            video: {
                start: 5,
                end: 0,
                time: 0,
                site: 0
            }
        }
    }
    static userInfo = {
        "isAvatar" : true,
        "token" : "dd68b8cb-9c9c-4da4-9d24-7cbc92006d41",
        "nickName" : "zpk",
        "memberId" : "ff8080815133db0d0151375bfdf30c0d",
        "avatar" : "/upload/avatar/big_ff8080815133db0d0151375bfdf30c0d.jpg",
    }
    static speed = [
        {
            value: 0.5,
            name: '0.5X'
        },
        {
            value: 1,
            name: '1X'
        },
        {
            value: 1.25,
            name: '1.25X'
        },
        {
            value: 1.5,
            name: '1.5X'
        },
        {
            value: 2,
            name: '2X'
        }
    ]

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

        this.setState({
            player: new Aliplayer({
                id: 'J_prismPlayer',
                width: '100%',
                autoplay: false,
                useFlashPrism: true,
                diagnosisButtonVisible: true,
                skinLayout: false,
                source : 'https://outin-53795a3a583a11e9b00500163e1c91c8.oss-cn-shanghai.aliyuncs.com/586aa50b8e6f46e89344c364acb57293/9b575775cf4a4133a84f537d2cb9fe0b-6f1b5a73f814e82f6caecad5cbbde505-ld.mp4?Expires=1555339643&OSSAccessKeyId=LTAItL9Co9nUDU5r&Signature=4THy7w82y1NNECXqKoPhMFJNZs8%3D',
                //vid : `${this.state.playData.VideoId}`,
                //playauth : `${this.state.playData.PlayAuth}`,
                //cover: this.state.playData.CoverURL,
            }, (player) => {
                console.log('播放器创建成功')
            })
        })
        this.getStart();
    }
    getStart() {
        let self = this;
        try {
            self.state.player.play();
            self.getTime();
           self.setState({
               video: self.state.video
           })
        } catch (e) {
            setTimeout(() => {
                self.getStart();
            }, 100);
        }

    }
    updateData(val) {
        if (val < 10) {
            val = '0' + val.toString();
        }
        return val;
    }
    Fotmat(val) {
        let num = Math.floor(val / 3600), arr = [];
        if (num > 0) {
            arr.push(this.updateData(num));
        } else {
            num = Math.floor(val / 3600);
            if (num > 0) {
                arr.push(this.updateData(num));
            } else {
                arr.push('00');
            }
            num = val % 60;
            num = Math.round(num);
            arr.push(this.updateData(num));
        }
        return arr.join(':');
    }
    getTime() {
       let self = this;
       try {
           self.state.video.start = self.state.player.getCurrentTime();
           self.state.video.end = self.state.player.getDuration();
           self.state.video.site = self.state.video.start;
           self.setState({
               video: self.state.video
           })
       } catch (e) {
            console.log('错了错了错了')
       }
       setTimeout(function() { self.getTime(); }, 10)
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
                <div className={'start'}>{this.Fotmat(this.state.video.start)}</div>
                <div className={'end'}>{this.Fotmat(this.state.video.end)}</div>
                <ul>
                    {
                        Pages.speed.map(({name, value}, index) => {
                            return <li key={index} value={value}>{name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Pages
