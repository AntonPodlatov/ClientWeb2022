document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        var inputArea = document.getElementById("input-area");

        if (inputArea.value === "") {
            alert("Введите значение.");
            return;
        }

        var celsiusTemperature = Number(inputArea.value);
        inputArea.value = "";

        if (isNaN(celsiusTemperature)) {
            alert("Введено не число.");
            return;
        }

        var fahrenheitTemperature = celsiusTemperature * 9 / 5 + 32;
        var kelvinTemperature = celsiusTemperature + 273.15;

        appendTableRowWithValues(celsiusTemperature, fahrenheitTemperature, kelvinTemperature);
    });

    function appendTableRowWithValues(celsiusTemperature, fahrenheitTemperature, kelvinTemperature) {
        var tbody = document.getElementById("tbody");
        var tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + celsiusTemperature + "</td>" +
            "<td>" + fahrenheitTemperature + "</td>" +
            "<td>" + kelvinTemperature + "</td>";

        tbody.appendChild(tr);
    }
});