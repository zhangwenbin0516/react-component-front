"use strict";
class CreateComponent {
    constructor() {
        this.getDate()
    }
    async getDate() {
        this.getTime = new Date().getTime();
        this.updateTime = this.getTime + 30 * 60 * 1000;
        this.timing = this.getTime + 3 * 60 * 1000;
        let time = localStorage.getItem('timing');
        let updateTime = localStorage.getItem('updateTime');
        if (updateTime <= this.getTime) {
            this.clearData()
        }
        if (time) {
            if (this.getTime > time) {
                localStorage.setItem('timing', this.timing)
                localStorage.setItem('updateTime', this.updateTime)
            }
        } else {
            localStorage.setItem('timing', this.timing)
            localStorage.setItem('updateTime', this.updateTime)
        }
    }

    async setData(key, data) {
        this.getDate();
        let lists = {
            startTime: this.getTime,
            data: data
        }
        localStorage.setItem(key, JSON.stringify(lists));
    }

    getData(key) {
        let data = localStorage.getItem(key);
        if (data) {
            let lists = JSON.parse(data);
            return lists.data
        } else {
            return null
        }
    }

    async updateData(item, key, data) {
        this.getDate();
        let body = localStorage.getItem(item);
        if (body) {
            let lists = JSON.parse(body);
            lists['updateTime'] = this.getTime;
            if (lists.data instanceof Object) {
                lists.data[key] = data
            } else {
                lists.data = data;
            }
            localStorage.setItem(item, JSON.stringify(lists));
        }
    }

    async removeData(key) {
        await localStorage.removeItem(key)
    }

    async clearData() {
        await localStorage.clear()
    }
}

const StorageData = new CreateComponent()

export default StorageData
