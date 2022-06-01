document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        var textField = document.getElementById("text-field");
        textField.value = textField.value.trim();

        if (textField.value === "") {
            alert("Input something.");
            return;
        }

        var list = document.getElementById("list");
        var listItem = document.createElement("li");
        listItem.className = "item";

        var itemTextNode = document.createTextNode(textField.value);
        listItem.appendChild(itemTextNode);

        var removeButton = createRemoveButton(listItem);
        var editButton = createEditButton(itemTextNode);

        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);
        list.appendChild(listItem);

        textField.value = "";
    });

    function createRemoveButton(listItem) {
        var removeButton = document.createElement("input");
        removeButton.type = "button";
        removeButton.value = "remove item";

        removeButton.addEventListener("click", function () {
            listItem.parentNode.removeChild(listItem);
        });

        return removeButton;
    }

    function createEditButton(itemTextNode) {
        var listItem = itemTextNode.parentNode;

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

            var cancelButton = createCancelButton(textContent, listItem);
            listItem.insertBefore(cancelButton, saveButton);
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

    function createCancelButton(textContent, listItem) {
        var cancelButton = document.createElement("input");
        cancelButton.type = "button";
        cancelButton.value = "cancel";

        cancelButton.addEventListener("click", function () {
            var newTextNode = document.createTextNode(textContent);

            listItem.children.item(0).replaceWith(newTextNode);
            listItem.children.item(1).replaceWith(createEditButton(newTextNode));
            cancelButton.parentNode.removeChild(cancelButton);
        });

        return cancelButton;
    }
});