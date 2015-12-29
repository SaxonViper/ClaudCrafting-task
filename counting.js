$(function(){

    // Начальный элемент первого списка
    var button1Offset = 1e+7;

    // Начальный элемент второго списка
    var button2Offset = 2e+7;

    // Количество элементов для вывода
    var outputLimit = 50;

    // Размер фрагмента для расчёта в PHP. Чем меньше, тем больше будет AJAX-запросов, но плавнее идти прогресс.
    var sectionSize = 200000;

    // Предпоследний элемент последовательности
    var fib1;

    // Последний элемент последовательности
    var fib2;

    var fib3;

    // Следующий для вычисления элемент
    var n;

    // Объект списка для заполнения
    var $listToFill;

    // Объект прогресс-бара
    var $progressBar;

    // Начинает расчёт последовательности
    function countFibs(offset, button) {
        // Делаем нужные эффекты
        console.time('Execution time');
        $progressBar = $(button).next();
        $progressBar.val(0).show();
        $listToFill = $(button).next().next();
        $listToFill.children().remove();
        $('.fillButton').attr("disabled", true);

        // Присваиваем стартовые значения глобальных переменных
        fib1 = 0;
        fib2 = 1;
        n = 2;

        // Запускает рекурсивную AJAX-функцию, которая "прокрутит" нужное количество элементов ряда и найдёт последние два
        ajaxSection(1, offset);
    }

    // Прокручивает очередную порцию элементов, записывает два последних и номер следующего за ними в глобальные переменные
    function ajaxSection(section, maxOffset) {
        if (n > maxOffset) {
            finishScrolling();
        } else {
            // Определяем, до какого числа "прокручивать" - либо до текущего + размер секции, либо до конца, смотря что ближе
            var numberTo = (n + sectionSize - 1 > maxOffset) ? maxOffset : n + sectionSize - 1;

            console.log(n, numberTo);
            for (n; n <= numberTo; n++) {
                fib3 = fib2 / n + fib1;
                fib1 = fib2;
                fib2 = fib3;
            }

            $progressBar.val(numberTo * 1000 / maxOffset);
            setTimeout(ajaxSection(section + 1, maxOffset), 10);
        }
    }

    // После "прокрутки" на нужное кол-во элементов, выводим нужно число следующих
    function finishScrolling() {
        // У нас есть первый элемент для вывода
        $listToFill.append('<li>F(' + (n - 1) + ') = ' + fib2 + '</li>');

        // Нужно найти ещё (limit - 1) элементов
        var numberTo = n + outputLimit - 2;

        for (n; n <= numberTo; n++) {
            fib3 = fib2 / n + fib1;
            fib1 = fib2;
            fib2 = fib3;
            // Выводим очередной элемент
            $listToFill.append('<li>F(' + n + ') = ' + fib2 + '</li>');
        }

        finishAnimation();
    }

    // JQuery-эффекты по завершении расчётов
    function finishAnimation(){
        $('.fillButton').attr("disabled", false);
        $progressBar.hide();
        console.timeEnd('Execution time');
    }

    $('#fillFirstList').click(function() {
        countFibs(button1Offset, this);
    });

    $('#fillSecondList').click(function() {
        countFibs(button2Offset, this);
    });
});