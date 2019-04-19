"use strict";
require('es6-promise').polyfill();
require('isomorphic-fetch');
import API from './api'


class CreateFetch {
    constructor() {
        this.location = window.location.hostname;
        if (this.location.match('www.zbgedu.com')) {
            this.host = 'https://api.zbgedu.com/api/';
        } else {
            this.host = 'https://apiDemo.zbgedu.com/api/';
        }
    }
    async get(url, req) {
        url = API[url];
        this.lists = {
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let list = new Array();
        this.body = '';
        if (req instanceof Object) {
            for (let index in req) {
                let str = index + '=' + req[index];
                list.push(str);
            }
            this.body = '?' + list.join('&');
        }
        let res = await fetch(this.host + url + this.body, this.lists);
        return await res.json()
    }
    async post(url, req) {
        url = API[url];
        this.lists = {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await fetch(this.host + url, this.lists);
        return await res.json()
    }
}

const Structure = new CreateFetch()

export default Structure
