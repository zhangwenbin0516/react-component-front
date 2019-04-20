"use strict";
let StorageData = new Object();

StorageData.getDate = function () {
    this.getTime = new Date().getTime();
    this.updateTime = this.getTime + 30 * 60 * 1000;
    this.timing = this.getTime + 3 * 60 * 1000;
    let time = localStorage.getItem('timing');
    if (this.updateTime <= this.getTime) {
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

StorageData.getData = function (key) {
    let data = localStorage.getItem(key);
    if (data) {
        let lists = JSON.parse(data);
        return lists.data
    }
}

StorageData.setData = function (key, data) {
    this.getDate();
    let lists = {
        startTime: this.getTime,
        data: data
    }
    localStorage.setItem(key, JSON.stringify(lists));
}

StorageData.updateData = async function (item, key, data) {
    this.getDate();
    let body = localStorage.getItem(item);
    if (body) {
        let lists = JSON.parse(body);
        lists['updateTime'] = this.getTime;
        lists[key] = data;
        localStorage.setItem(item, JSON.stringify(lists));
    }
}

StorageData.removeData = function (key) {
    localStorage.removeItem(key)
}

StorageData.clearData = function () {
    localStorage.clear()
}

export default StorageData
