"use strict";

class CreateStorage {
    async constructor() {
        this.getTime = new Date().getTime();
        this.updateTime = this.getTime + 30 * 60 * 1000;
    }
    async setData() {

    }
    async getData() {

    }
    async removeData() {

    }
    async updateData() {
        console.log(this)
    }
}

const StorageComponent = new CreateStorage()

export default StorageComponent
