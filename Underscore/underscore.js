(function () {
    var persons = [
        {age: 23, name: "Alex"},
        {age: 28, name: "Ivan"},
        {age: 30, name: "Anton"},
        {age: 45, name: "Dmitry"},
        {age: 44, name: "Boris"},
        {age: 27, name: "Anna"},
        {age: 19, name: "Nikolay"},
        {age: 21, name: "Leonid"},
        {age: 35, name: "Constantin"},
        {age: 28, name: "Boris"},
        {age: 27, name: "Boris"}
    ];

    var averageAge = _.reduce(persons, function (memo, person) {
        return memo + person.age;
    }, 0) / persons.length;

    var sortedByAgePersonsFrom20To30 = _.chain(persons)
        .filter(function (person) {
            return person.age >= 20 && person.age <= 30;
        })
        .sortBy("age")
        .value();

    var uniqueNamesOfPersonsFrom30To20Sorted = _.chain(persons)
        .filter(function (person) {
            return person.age >= 20 && person.age <= 30;
        })
        .map(function (person) {
            return person.name;
        })
        .uniq()
        .sortBy(function (name) {
            return name;
        })
        .reverse()
        .value();

    var namesCounts = _.countBy(persons, "name");

    console.log("average age: " + averageAge);
    console.log("");

    console.log("persons from 20 to 30 years old sorted by age:");
    sortedByAgePersonsFrom20To30.forEach(function (person) {
        console.log(person.name + " " + person.age);
    });
    console.log("");

    console.log("unique names of persons from 30 to 20 years old sorted by name:");
    uniqueNamesOfPersonsFrom30To20Sorted.forEach(function (name) {
        console.log(name);
    });
    console.log("");

    console.log("Names counts:");
    console.log(namesCounts);
}());