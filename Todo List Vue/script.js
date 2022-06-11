new Vue({
    el: "#app",

    data: {
        newText: "",
        items: [],
        currentItemId: 0,
        isNewTextInvalid: false,
    },

    methods: {
        addToList: function () {
            var newText = this.newText.trim();

            if (newText === "") {
                this.isNewTextInvalid = true;
                this.newText = "";
                return;
            }

            this.items.push({
                text: newText,
                id: this.currentItemId++,
                isEditing: false,
                editingText: "",
                isEditTextInvalid: false
            });

            this.isNewTextInvalid = false;
            this.newText = "";
        },

        removeItem: function (index) {
            this.items.splice(index, 1);
        },

        editItem: function (item) {
            item.editingText = item.text;
            item.isEditing = true;
        },

        saveItem: function (item) {
            var editingText = item.editingText.trim();

            if (editingText === "") {
                item.isEditTextInvalid = true;
                item.editingText = "";
                return;
            }

            item.isEditTextInvalid = false;
            item.text = editingText;
            item.isEditing = false;
        },

        cancelEditing: function (item) {
            item.isEditing = false;
            item.isEditTextInvalid = false;
        }
    }
});
