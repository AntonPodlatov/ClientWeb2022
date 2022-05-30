(function () {
    function getArray() {
        return [1, 2, 3, 5, 6, 7, 3, 5, 324, 334, 4, 1, 0];
    }

    function sortArray(array) {
        return array.sort(function (e1, e2) {
            return e2 - e1;
        });
    }

    function getFirst5(array) {
        return array.slice(0, 5);
    }

    function getLast5(array) {
        return array.slice(array.length - 5);
    }

    function getEvenNumbersSum(array) {
        return array.reduce(function (sum, current) {
            if (current % 2 === 0) {
                return sum + current;
            }

            return sum;
        }, 0);
    }

    function get100SizeArray() {
        var array = [];

        for (var i = 1; i <= 100; i++) {
            array.push(i);
        }

        return array;
    }

    function getNumberSquaresListFromNumbersArray(array) {
        return array.filter(function (element) {
            return element % 2 === 0;
        }).map(function (element) {
            return element * element;
        });
    }

    console.log("Массив: " + getArray());
    console.log("Массив отсортирован: " + sortArray(getArray()));
    console.log("Первые 5 элементов массива: " + getFirst5(sortArray(getArray())));
    console.log("Последние 5 элементов массива: " + getLast5(sortArray(getArray())));
    console.log("Сумма четных чисел иассива: " + getEvenNumbersSum(getArray()));

    console.log("Массив размера 100: " + get100SizeArray());
    console.log("Квадраты четных чисел из массива размера 100: " + getNumberSquaresListFromNumbersArray(get100SizeArray()));
}());