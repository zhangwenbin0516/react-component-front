"use strict";
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
import API from './api'


class CreateFetch {
    constructor() {
        let host = window.location.href;
        if (host.match('www.zbgedu.com')) {
            this.host = 'https://api.zbgedu.com'
        } else if (host.match('Demo.zbgedu.com')) {
            this.host = 'https://apiDemo.zbgedu.com'
        } else {
            this.host = ''
        }
    }
    async get(url, req) {
        url = API[url].path;
        this.lists = {
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let list = new Array();
        this.body = '';
        if (req instanceof Object) {
            let datas = req.data || req;
            for (let index in datas) {
                let str = index + '=' + datas[index];
                list.push(str);
            }
            this.body = '?' + list.join('&');
            this.lists.headers = req.headers || this.lists.headers;
            this.lists.cache = req.cache || this.lists.cache;
            this.lists.mode = req.mode || this.lists.mode;
        }
        let res = await fetch(this.host + url + this.body, this.lists);
        return await res.json()
    }
    async post(url, req) {
        url = API[url].path;
        this.lists = {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (req instanceof Object) {
            this.lists.headers = req.headers || this.lists.headers;
            this.lists.cache = req.cache || this.lists.cache;
            this.lists.mode = req.mode || this.lists.mode;
            this.lists.body = req.body || req;
            this.lists.body = JSON.stringify(this.lists.body)
        }
        let res = await fetch(this.host + url, this.lists);
        return await res.json()
    }
}

const Structure = new CreateFetch()

export default Structure
