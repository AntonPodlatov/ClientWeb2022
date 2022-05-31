document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        var textField = document.getElementById("text-field");

        if (textField.value === "") {
            alert("Input something.");
            return;
        }

        var list = document.getElementById("list");
        var item = document.createElement("li");
        item.className = "item";

        var itemTextNode = document.createTextNode(textField.value);
        item.appendChild(itemTextNode);

        var removeButton = createRemoveButton(item);
        var editButton = createEditButton(itemTextNode);

        item.appendChild(editButton);
        item.appendChild(removeButton);
        list.appendChild(item);

        textField.value = "";
    });

    function createRemoveButton(item) {
        var removeButton = document.createElement("input")
        removeButton.type = "button";
        removeButton.value = "remove item";

        removeButton.addEventListener("click", function () {
            item.parentNode.removeChild(item);
        });

        return removeButton;
    }

    function createEditButton(itemTextNode) {
        var item = itemTextNode.parentNode;

        var editButton = document.createElement("input");
        editButton.type = "button";
        editButton.value = "edit";

        var editField = document.createElement("input");
        editField.type = "text";
        editField.value = itemTextNode.textContent;

        editButton.addEventListener("click", function () {
            var textContent = itemTextNode.textContent;
            itemTextNode.replaceWith(editField);

            var saveButton = createSaveButton(editField);
            editButton.replaceWith(saveButton);

            var cancelButton = createCancelButton(textContent, editField, saveButton);
            item.insertBefore(cancelButton, saveButton);
        });

        return editButton;
    }

    function createSaveButton(editField) {
        var saveButton = document.createElement("input");
        saveButton.type = "button";
        saveButton.value = "save";

        saveButton.addEventListener("click", function () {
            var newTextNode = document.createTextNode(editField.value);
            editField.replaceWith(newTextNode);

            saveButton.replaceWith(createEditButton(newTextNode));
            newTextNode.parentNode.removeChild(newTextNode.parentNode.children.item(0));
        });

        return saveButton;
    }

    function createCancelButton(textContent, editField, saveButton) {
        var cancelButton = document.createElement("input");
        cancelButton.type = "button";
        cancelButton.value = "cancel";

        cancelButton.addEventListener("click", function () {
            var newTextNode = document.createTextNode(textContent);

            editField.replaceWith(newTextNode);
            saveButton.replaceWith(createEditButton(newTextNode));
            cancelButton.parentNode.removeChild(cancelButton);
        });

        return cancelButton;
    }
});