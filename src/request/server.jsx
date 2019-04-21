"use strict";
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
import API from './api'


class CreateFetch {
    constructor() {

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
            for (let index in req) {
                let str = index + '=' + req[index];
                list.push(str);
            }
            this.body = '?' + list.join('&');
        }
        let res = await fetch(url + this.body, this.lists);
        return await res.json()
    }
    async post(url, req) {
        url = API[url].path;
        this.lists = {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await fetch(url, this.lists);
        return await res.json()
    }
}

const Structure = new CreateFetch()

export default Structure
