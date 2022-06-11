$(document).ready(function () {
    $("#add_button").on("click", function () {
        var textField = $("#text-field");
        textField.val(textField.val().trim());

        if (textField.val() === "") {
            alert("Input something.")
            return;
        }

        var list = $(".list-group");
        var item = $("<li class='list-group-item d-flex text-break align-items-center'></li>");
        item.text(textField.val());
        var editButton = getEditButton(item);
        var removeButton = getRemoveButton(item);

        editButton.appendTo(item);
        removeButton.appendTo(item);
        item.appendTo(list);

        textField.val("");
    });

    function getRemoveButton(item) {
        return $("<input type='button' value='Remove item' class='btn btn-outline-secondary'>")
            .on("click", function () {
                item.remove();
            });
    }

    function getEditButton(item) {
        var editButton = $("<input type='button' class='btn btn-outline-secondary ms-auto me-1' value='Edit'>");
        var editField = $("<input type='text' class='form-control ' value='" + item.text() + "'>");
        var savedText = item.text();

        editButton.on("click", function () {
            item.contents().filter(function () {
                return this.nodeType === Node.TEXT_NODE;
            }).remove();

            editField.prependTo(item);
            editButton.replaceWith(getSaveButton(editField, item));

            var cancelButton = getCancelButton(item, savedText);
            cancelButton.insertAfter(item.children().eq(0));
        });

        return editButton;
    }

    function getSaveButton(editField, item) {
        var saveButton = $("<input type='button' class='btn btn-outline-secondary me-1' value='Save'>");

        saveButton.on("click", function () {
            if (editField.val() === "") {
                editField[0].placeholder = "An empty entry is prohibited.";
                return;
            }

            editField.replaceWith(editField.val());
            item.children().eq(0).remove();
            saveButton.replaceWith(getEditButton(item));
        });

        return saveButton;
    }

    function getCancelButton(item, savedText) {
        var cancelButton = $("<input type='button' class='ms-1 me-1 btn btn-outline-secondary' value='Cancel'>");

        cancelButton.on("click", function () {
            item.children().eq(0).replaceWith(savedText);
            item.children().eq(0).remove();
            item.children().eq(0).replaceWith(getEditButton(item));
        });

        return cancelButton;
    }
});