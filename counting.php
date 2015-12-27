<?php

// Использование классов снижает производительность примерно в 10 раз, поэтому скрипт сделан максимально просто

// Обращение к функции также сильно снижает производительность кода, поэтому формула просто скопирована в 2 местах
/**
 * Формула для расчёта n-ного члена последовательности
 * @param float $fib1  Предпоследний член ряда
 * @param float $fib2  Последний член ряда
 * @param int $n  Номер рассчитываемого элемента
 * @return float
 */
function fibFormula($fib1, $fib2, $n) {
    return $fib2 / $n + $fib1;;
}

// Определяем параметры AJAX-запроса
$fib1 = $_GET['fib1'];
$fib2 = $_GET['fib2'];
$numberFrom = $_GET['numberFrom'];
$numberTo = $_GET['numberTo'];
$scrolling = $_GET['scrolling'];

if ($scrolling) {
    // Нужны только 2 последних элемента
    for ($n = $numberFrom; $n <= $numberTo; $n++) {
        $fib3 = $fib2 / $n + $fib1;
        $fib1 = $fib2;
        $fib2 = $fib3;
    }

    // Отдаём два последних элемента
    $answer = [$fib1, $fib2];
    echo json_encode($answer);
} else {
    // Нужны все элементы, включая текущий последний
    $answer = [$numberFrom - 1 => $fib2];
    for ($n = $numberFrom; $n <= $numberTo; $n++) {
        $fib3 = $fib2 / $n + $fib1;
        $answer[$n] = $fib3;
        $fib1 = $fib2;
        $fib2 = $fib3;
    }

    // Отдаём все найденные элементы
    echo json_encode($answer);
}




