jQuery(function () {
    var $ = jQuery;
    const step = 100;

    const addTimeElement = function (time, text) {
        return '<span class="time">' + time + '</span><span class="text">' + text + "</span>";
    };

    const switchLang = function (number, index) {
        var key;
        switch (number) {
            case 1:
                key = 'SgN';
                break;
            case 2:
            case 3:
            case 4:
                key = 'PlN';
                break;
            case 0:
            default:
                key = 'PlG';
                break;
        }
        return LANG.plugins.fkstimer[index + key];
    };

    const getTimeElements = function (delta) {
        if (delta < 0) {
            return LANG.plugins.fkstimer['past-event'];
        }
        delta -= (60 * 60 * 1000);
        const time = (new Date(delta));
        const hours = time.getHours();
        const days = time.getDate() + (time.getMonth() * 31) - 1;

        var html = '';
        if (days) {
            html += addTimeElement(days, switchLang(days, 'day'));
        }
        if (days || hours) {
            html += addTimeElement(hours, switchLang(hours, 'hour'));
        }
        if (days < 100) {
            const min = time.getMinutes();
            html += addTimeElement(min, switchLang(min, 'min'));
        }
        if (!days) {
            const sec = time.getSeconds();
            if (step < 1000) {
                const millisecond = Math.floor(time.getMilliseconds() / 100);
                html += addTimeElement(sec + ',' + millisecond, switchLang(sec, 'sec'));
            } else {
                html += addTimeElement(sec, switchLang(sec, 'sec'));
            }
        }

        return html;
    };
    const countDown = function ($span, deltaServer) {
        const current = (new Date()).getTime() + deltaServer;
        const deadline = (new Date($span.data('date'))).getTime();
        const delta = deadline - current;
        const text = getTimeElements(delta, deltaServer);
        $span.html(text);
        setTimeout(function () {
            countDown($span, deltaServer);
        }, step);
    };

    $('.fks-timer').each(function () {
        var deltaServer = (new Date($('meta[name="fks-timer"]').attr('content'))).getTime() - (new Date()).getTime();
        countDown($(this), deltaServer);
    });
});
