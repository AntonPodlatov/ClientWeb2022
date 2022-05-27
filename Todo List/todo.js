var button = document.getElementById("button");

button.addEventListener("click", function () {
    var textFieldContent = document.getElementById("text-field").value;

    if (textFieldContent !== "") {
        var list = document.getElementById("list");
        var item = document.createElement("li");
        item.setAttribute("class", "item")

        var itemTextNode = document.createTextNode(textFieldContent);
        var removeButton = getRemoveButton(item);
        var editButton = getEditButton(itemTextNode);

        item.appendChild(itemTextNode);
        item.appendChild(editButton);
        item.appendChild(removeButton);
        list.appendChild(item);

        document.getElementById("text-field").value = "";
    } else {
        alert("Input something.");
    }
});

function getRemoveButton(item) {
    var removeButton = document.createElement("input")
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "remove item");

    removeButton.addEventListener("click", function () {
        item.parentNode.removeChild(item);
    });

    return removeButton;
}

function getEditButton(itemTextNode) {
    var editButton = document.createElement("input");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("value", "edit");

    var editField = document.createElement("input");
    editField.setAttribute("type", "text");
    editField.setAttribute("value", itemTextNode.textContent);

    editButton.addEventListener("click", function () {
        itemTextNode.replaceWith(editField);

        var saveButton = getSaveButton(editField);
        editButton.replaceWith(saveButton);
    });

    return editButton;
}

function getSaveButton(editField){
    var saveButton = document.createElement("input");
    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("value", "save");
    saveButton.addEventListener("click", function () {

        var newTextNode = document.createTextNode(editField.value);
        editField.replaceWith(newTextNode);

        saveButton.replaceWith(getEditButton(newTextNode))
    });

    return saveButton;
}