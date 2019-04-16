import React from 'react';
import {HashRouter as Router, Link} from "react-router-dom";

class AsideNav extends React.Component {
    constructor(props) {
        super(props)
    }
    static NavList = [
        {
            path: '/',
            name: '首页',
            icon: 'home'
        },
        {
            path: '/course',
            name: '我的课程',
            icon: 'course'
        },
        {
            path: '/Information',
            name: '题库',
            icon: 'Information'
        },
        {
            path: '/record',
            name: '做题记录',
            icon: 'record'
        },
        {
            path: '/note',
            name: '我的笔记',
            icon: 'note'
        },
        {
            path: '/exchange',
            name: '我的交流',
            icon: 'exchange'
        },
        {
            path: '/help',
            name: '我的帮助',
            icon: 'help'
        }
    ]
    componentWillMount() {
        this.setState({
            navIndex: 0
        })
    }

    render() {
        return(
            <aside className="pages-left">
                <nav>
                    <Router>
                        <ul className={'menu'}>
                        {
                            AsideNav.NavList.map(({path, name, icon}, index) => {
                                return <li className={`${icon} ${this.state.navIndex == index ? 'active' : ''}`} key={index}>
                                            <Link to={path}>{name}</Link>
                                        </li>
                            })
                        }
                        </ul>
                    </Router>
                </nav>
            </aside>
        )
    }
}

export default AsideNav