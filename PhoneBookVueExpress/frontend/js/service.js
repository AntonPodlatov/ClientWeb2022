import $ from "jquery";

export default class {
    constructor() {
        this.apiUrl = "/api/";
    }

    get(url, data) {
        return $.get({
            url,
            data
        });
    }

    post(url, data) {
        return $.post({
            url,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
    }

    getRecords(term) {
        return this.get(this.apiUrl + "getRecords", {term});
    }

    createRecord(record) {
        return this.post(this.apiUrl + "createRecord", record);
    }

    removeRecord(idArray) {
        return this.post(this.apiUrl + "removeRecord", {idArray});
    }
}