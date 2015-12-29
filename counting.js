self.addEventListener('message', function(e) {
    // Получаем данные и запускаем расчёт
    var data = e.data;
    var fibs = countFibs(data.offset, data.limit);
    // Отдаём результат в главный скрипт
    self.postMessage(fibs);
}, false);

// Рассчитывает последовательность чисел
function countFibs(offset, limit) {

    // Присваиваем стартовые значения переменных

    // Предпоследний элемент последовательности
    var fib1 = 0;

// Последний элемент последовательности
    var fib2 = 1;

// Свежерассчитанный элемент
    var fib3;

// Номер следующего элемента для вычисления
    var n = 2;

    // Цикл до последнего не выводимого элемента
    for (n; n <= offset - 1; n++) {
        fib3 = fib2 / n + fib1;
        fib1 = fib2;
        fib2 = fib3;
    }

    // После "прокрутки" до нужных элементов, набираем их в массив
    var answer = [];

    for (n; n <= (offset + limit - 1); n++) {
        fib3 = fib2 / n + fib1;
        fib1 = fib2;
        fib2 = fib3;
        answer[n] = fib2;
    }

    return answer;
}

