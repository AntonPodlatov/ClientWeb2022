function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}


Vue.use(VueMask.VueMaskPlugin);

new Vue({
    el: "#app",

    data: {
        newName: "",
        newSurname: "",
        newPhone: "",
        term: "",

        isFormValidated: false,
        isNewNameInvalid: false,
        isNewSurnameInvalid: false,
        isNewPhoneDuplicate: false,

        records: [],
        recordToDelete: {},

        isSomethingChecked: false,
        isAllChecked: false
    },

    created: function () {
        this.loadRecords();
    },

    methods: {
        loadRecords: function () {
            var self = this;

            get("api/getRecords", {term: this.term})
                .done(function (records) {
                    records.forEach(function (record) {
                        record["isChecked"] = false;
                    });

                    self.records = records;
                })
                .fail(function () {
                    alert("Can`t load records.");
                });
        },

        addRecord: function () {
            this.newName = this.newName.trim();
            this.newSurname = this.newSurname.trim();

            if (this.newName === "" || this.newSurname === "" ||
                this.newPhone === "" || this.newPhone.length < 12) {
                this.isFormValidated = true;
                return;
            }

            if (this.isNewSurnameInvalid || this.isNewNameInvalid) {
                return;
            }

            var self = this;
            console.log(this.newPhone);

            post("/api/createRecord", {
                name: self.newName,
                surname: self.newSurname,
                phone: "+7-" + self.newPhone
            })
                .done(function (res) {
                    if (res.success) {
                        self.loadRecords();

                        self.isFormValidated = false;
                        self.newSurname = "";
                        self.newName = "";
                        self.newPhone = "";
                    } else {
                        if (res.messageArray.includes("Phone is a duplicate.")) {
                            self.isNewPhoneDuplicate = true;
                        } else {
                            console.log(res.messageArray);
                        }
                    }
                })
                .fail(function (res) {
                    alert(res.message);
                });
        },

        checkAllCheckboxes: function () {
            var isAllChecked = this.isAllChecked;

            this.records.forEach(function (record) {
                record.isChecked = isAllChecked;
            });
        },

        showRemovingDialog: function (record) {
            this.recordToDelete = record;
            this.isSomethingChecked = false;

            var self = this;
            this.records.forEach(function (record) {
                if (record.isChecked) {
                    self.isSomethingChecked = true;
                }
            });

            var modalWindow = this.$refs.modal_window;
            var modal = new bootstrap.Modal(modalWindow, {backdrop: true, keyboard: true, focus: true});
            modal.show();
        },

        remove: function () {
            var recordToDelete = this.recordToDelete;
            var idArray = [];

            if (this.isSomethingChecked) {
                this.records.forEach(function (record) {
                    if (record.isChecked) {
                        idArray.push(record.id);
                    }
                });
            } else {
                idArray = [recordToDelete.id];
            }

            var self = this;

            post("api/removeRecord", {
                idArray: idArray
            }).done(function (res) {
                if (res.success) {
                    self.loadRecords();
                } else {
                    console.log(res.message)
                }
            }).fail(function () {
                alert("Can`t remove record(s).");
            });
        },

        checkNewName: function () {
            var nameRegex = /^[а-яА-ЯёЁa-zA-Z- ]*$/;
            this.isNewNameInvalid = !nameRegex.test(this.newName);
        },

        checkNewSurname: function () {
            var nameRegex = /^[а-яА-ЯёЁa-zA-Z- ]*$/;
            this.isNewSurnameInvalid = !nameRegex.test(this.newSurname);
        },
    }
});