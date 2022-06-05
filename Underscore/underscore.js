var humans = [
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

var averageAge = _.reduce(humans, function (memo, human) {
    return memo + human.age;
}, 0) / humans.length;

var sortedHumansFrom20To30 = _.chain(humans)
    .filter(function (human) {
        return human.age >= 20 && human.age <= 30;
    }).sortBy("age");

var uniqueNamedHumansFrom30To20 = _.chain(humans)
    .filter(function (human) {
        return human.age >= 20 && human.age <= 30;
    }).sortBy(function (human) {
        return -human.age;
    }).uniq(true, function (human) {
        return human.name;
    });

var namesCount = _.countBy(humans, "name");

console.log("average age: " + averageAge);
console.log("");

console.log("humans from 20 to 30 years old sorted by age:");
sortedHumansFrom20To30.forEach(e => console.log(e.name + " " + e.age));
console.log("");

console.log("unique named humans from 30 to 20 years old sorted by age:");
uniqueNamedHumansFrom30To20.forEach(e => console.log(e.name + " " + e.age));
console.log("");

console.log("Names counts:");
console.log(namesCount);

