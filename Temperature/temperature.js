var button = document.getElementById("button");

button.addEventListener("click", function () {
    if (document.getElementById("input-area").value === "") {
        alert("Введите значение.");
    } else {
        var celsiusValue = Number(document.getElementById("input-area").value);
        var fahrenheitValue = celsiusValue * 9 / 5 + 32;
        var kelvinValue = celsiusValue + 273.15;

        var table = getTable(celsiusValue, fahrenheitValue, kelvinValue);
        document.body.appendChild(table);
    }
})

function getTable(celsiusValue, fahrenheitValue, kelvinValue) {
    var table = document.createElement("table");

    var thead = document.createElement("thead");
    var tr1 = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");

    var celsius = document.createTextNode("Celsius");
    var kelvin = document.createTextNode("Kelvin");
    var fahrenheit = document.createTextNode("Fahrenheit");

    th1.appendChild(celsius);
    th2.appendChild(fahrenheit);
    th3.appendChild(kelvin);
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    thead.appendChild(tr1);

    var celsiusNode = document.createTextNode(celsiusValue);
    var kelvinNode = document.createTextNode(kelvinValue);
    var fahrenheitNode = document.createTextNode(fahrenheitValue);

    var tbody = document.createElement("tbody")
    var tr2 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td1.appendChild(celsiusNode);
    td2.appendChild(fahrenheitNode);
    td3.appendChild(kelvinNode);
    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    tbody.appendChild(tr2)

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}