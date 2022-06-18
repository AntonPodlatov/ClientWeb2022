Vue.use(VueMask.VueMaskPlugin);

new Vue({
    el: "#app",

    data: {
        newName: "",
        newSurname: "",
        newPhone: "",

        isFormValidated: false,
        isNewNameInvalid: false,
        isNewSurnameInvalid: false,
        isNewPhoneDuplicate: false,

        records: [],
        removeCallingRecord: {},
        currentItemId: 0,

        isAllChecked: false,
        isSomethingChecked: false
    },

    methods: {
        addRecord: function () {
            this.newName = this.newName.trim();
            this.newSurname = this.newSurname.trim();

            if (this.newName === "" || this.newSurname === "" || this.newPhone === "" || this.newPhone.length < 12) {
                this.isFormValidated = true;
                return;
            }

            if (this.isNewSurnameInvalid || this.isNewNameInvalid) {
                return;
            }

            if (this.isNumberDuplicate(this.newPhone)) {
                this.isNewPhoneDuplicate = true;
                return;
            }

            this.records.push({
                id: this.currentItemId++,
                name: this.newName,
                surname: this.newSurname,
                phone: "+7-" + this.newPhone,
                isChecked: false,
            });

            this.isFormValidated = false;
            this.newSurname = "";
            this.newName = "";
            this.newPhone = "";
        },

        checkAllCheckboxes: function () {
            var isAllChecked = this.isAllChecked;

            this.records.forEach(function (record) {
                record.isChecked = isAllChecked;
            });
        },

        showRemovingDialog: function (record) {
            this.removeCallingRecord = record;
            this.isSomethingChecked = false;

            var checkedRecords = this.records.filter(function (record) {
                return record.isChecked;
            });

            if (checkedRecords.length !== 0) {
                this.isSomethingChecked = true;
            }

            var modalWindow = this.$refs.modal_window;
            var modal = new bootstrap.Modal(modalWindow, {backdrop: true, keyboard: true, focus: true});
            modal.show();
        },

        remove: function () {
            var removeCallingRecord = this.removeCallingRecord;

            if (this.isSomethingChecked) {
                this.records = this.records.filter(function (x) {
                    return x.isChecked === false;
                });
            } else {
                this.records = this.records.filter(function (x) {
                    return x !== removeCallingRecord;
                });
            }

            this.isSomethingChecked = false;
        },

        checkNewName: function () {
            var nameRegex = /^[а-яА-ЯёЁa-zA-Z- ]*$/;
            this.isNewNameInvalid = !nameRegex.test(this.newName);
        },

        checkNewSurname: function () {
            var nameRegex = /^[а-яА-ЯёЁa-zA-Z- ]*$/;
            this.isNewSurnameInvalid = !nameRegex.test(this.newSurname);
        },

        isNumberDuplicate: function (phone) {
            return this.records.some(function (record) {
                if (record.phone.substring(3) === phone) {
                    return true;
                }
            });
        }
    }
});