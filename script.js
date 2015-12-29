$(function(){

    // Начальный элемент первого списка
    var button1Offset = 1e+7;

    // Начальный элемент второго списка
    var button2Offset = 2e+7;

    // Количество элементов для вывода
    var outputLimit = 50;

    // Объект списка для заполнения
    var $listToFill;

    // Делаем нужные эффекты, в качестве параметра передаётся нажатая кнопка
    function startAnimation(button) {
        console.time('Execution time');
        $listToFill = $(button).next().next();
        $listToFill.children('li').remove();
        $listToFill.prev('.loading').show();
        $('.fillButton').attr("disabled", true);
    }

    function countFibs(button, offset, limit) {
        // Делаем начальные эффекты
        startAnimation(button);

        var countingWorker = new Worker('counting.js');
        countingWorker.postMessage({offset: offset, limit: limit});

        countingWorker.addEventListener('message', function(e) {
            // Заполняем лист и делаем финальные эффекты
            finishAnimation();
            fillList(e.data);
        }, false);
    }

    // Заполняет список пришедшими значениями
    function fillList(data) {
        for (var key in data) {
            $listToFill.append('<li>F(' + (key) + ') = ' + data[key] + '</li>');
        }

    }

    // JQuery-эффекты по завершении расчётов
    function finishAnimation(){
        $('.fillButton').attr("disabled", false);
        $listToFill.prev('.loading').hide();
        console.timeEnd('Execution time');
    }

    $('#fillFirstList').click(function() {
        countFibs(this, button1Offset, outputLimit);
    });

    $('#fillSecondList').click(function() {
        startAnimation(this);
        countFibs(this, button2Offset, outputLimit);
    });
});