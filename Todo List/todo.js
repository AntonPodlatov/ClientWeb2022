var button = document.getElementById("button");

button.addEventListener("click", function () {
    var textFieldContent = document.getElementById("text-field").value;

    if (textFieldContent !== "") {
        var list = document.getElementById("list");
        var item = document.createElement("li");
        item.setAttribute("class", "item")
        var itemNode = document.createTextNode(textFieldContent);
        var horizontalLine = document.createElement("hr");

        item.appendChild(itemNode);
        item.appendChild(getRemoveButton(item));
        list.appendChild(item);

        document.getElementById("text-field").value = "";
    }else {
        alert("Input something.")
    }
});

function getRemoveButton(item) {
    var removeButton = document.createElement("input")
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "remove item");
    removeButton.setAttribute("class", "remove_button")


    removeButton.addEventListener("click", function () {
        item.parentNode.removeChild(item);
    })

    return removeButton;
}