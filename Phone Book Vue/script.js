Vue.use(VueMask.VueMaskPlugin);

new Vue({
    el: "#app",

    data: {
        newName: "",
        newSurname: "",
        newPhone: "",

        nameRegex: /^[а-яА-ЯёЁa-zA-Z- ]*$/,

        isFormValidated: false,
        isNewNameInvalid: false,
        isNewSurnameInvalid: false,
        isNewPhoneDuplicate: false,

        records: [],
        recordToDelete: {},
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
                isChecked: false
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
            this.recordToDelete = record;
            this.isSomethingChecked = false;

            var self = this;
            this.records.forEach(function (record) {
                if (record.isChecked) {
                    self.isSomethingChecked = true;
                }
            });

            var modalWindow = this.$refs.modalWindow;
            var modal = new bootstrap.Modal(modalWindow, {backdrop: true, keyboard: true, focus: true});
            modal.show();
        },

        remove: function () {
            var recordToDelete = this.recordToDelete;

            if (this.isSomethingChecked) {
                this.records = this.records.filter(function (x) {
                    return x.isChecked === false;
                });
            } else {
                this.records = this.records.filter(function (x) {
                    return x !== recordToDelete;
                });
            }

            this.isSomethingChecked = false;
        },

        checkNewName: function () {
            this.isNewNameInvalid = !this.nameRegex.test(this.newName);
        },

        checkNewSurname: function () {
            this.isNewSurnameInvalid = !this.nameRegex.test(this.newSurname);
        },

        isNumberDuplicate: function (phone) {
            return this.records.some(function (record) {
                return record.phone.substring(3) === phone;
            });
        },
    }
});