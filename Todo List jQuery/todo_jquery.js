$(document).ready(function () {
    $("#add_button").on("click", function () {
        var textField = $("#text-field");

        if (textField.val() !== "") {
            var list = $("#list");
            var item = $("<li class='item'></li>");
            item.text(textField.val());
            var editButton = getEditButton(item);
            var removeButton = getRemoveButton(item);

            editButton.appendTo(item);
            removeButton.appendTo(item);
            item.appendTo(list);

            textField.val("");
        } else {
            alert("Input something.")
        }
    });

    function getRemoveButton(item) {
        return $("<input type='button' value='remove item'>")
            .on("click", function () {
                item.remove();
            });
    }

    function getEditButton(item) {
        var editButton = $("<input type='button' value='edit'>");
        var editField = $("<input type='text'>");
        editField.attr("value", item.text());

        editButton.on("click", function () {
            item.contents().filter(function () {
                return this.nodeType === Node.TEXT_NODE;
            }).remove();

            editField.prependTo(item);
            editButton.replaceWith(getSaveButton(editField, item));
        });

        return editButton;
    }

    function getSaveButton(editField, item) {
        var saveButton = $("<input type='button' value='save'>");

        saveButton.on("click", function () {
            editField.replaceWith(editField.val());
            saveButton.replaceWith(getEditButton(item))
        });

        return saveButton;
    }
});