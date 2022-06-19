$(document).ready(function () {
    var textField = $("#text-field");

    textField.on("input", function () {
        textField.removeClass("is-invalid");
    });

    $("#add_button").click(function () {
        textField.val(textField.val().trim());

        if (textField.val() === "") {
            textField.addClass("is-invalid");
            return;
        }

        textField.removeClass("is-invalid");

        var list = $(".list-group");
        var item = $("<li class='list-group-item d-flex text-break align-items-center'></li>");
        item.text(textField.val());
        var editButton = createEditButton(item);
        var removeButton = createRemoveButton(item);

        editButton.appendTo(item);
        removeButton.appendTo(item);
        item.appendTo(list);

        textField.val("");
    });

    function createRemoveButton(item) {
        return $("<button type='button' class='btn btn-outline-secondary text-nowrap remove_button'>Remove item</button>")
            .click(function () {
                item.remove();
            });
    }

    function createEditButton(item) {
        var savedText = item.contents().filter(function () {
            return this.nodeType === Node.TEXT_NODE;
        }).text();

        var editButton = $("<button type='button' class='btn btn-outline-secondary ms-auto me-1 text-nowrap'>Edit</button>");
        var editField = $("<input type='text' class='form-control flex-wrap' placeholder='An empty entry is prohibited'>");
        editField.val(savedText);

        editField.on("input", function () {
            editField.removeClass("is-invalid");
        });

        editButton.click(function () {
            item.contents().filter(function () {
                return this.nodeType === Node.TEXT_NODE;
            }).remove();

            editField.prependTo(item);
            editButton.replaceWith(createSaveButton(editField, item));

            var cancelButton = createCancelButton(item, savedText);
            cancelButton.insertAfter(item.children().eq(0));
        });

        return editButton;
    }

    function createSaveButton(editField, item) {
        var saveButton = $("<button type='button' class='btn btn-outline-secondary me-1 text-nowrap'>Save</button>");

        saveButton.click(function () {
            if (editField.val().trim() === "") {
                editField.addClass("is-invalid");
                return;
            }

            editField.removeClass("is-invalid");
            editField.replaceWith(editField.val());
            item.children().eq(0).remove();
            saveButton.replaceWith(createEditButton(item));
        });

        return saveButton;
    }

    function createCancelButton(item, savedText) {
        var cancelButton = $("<button type='button' class='ms-1 me-1 btn btn-outline-secondary text-nowrap'>Cancel</button>");

        cancelButton.click(function () {
            item.children().eq(0).replaceWith(savedText);
            item.children().eq(0).remove();
            item.children().eq(0).replaceWith(createEditButton(item));
        });

        return cancelButton;
    }
});