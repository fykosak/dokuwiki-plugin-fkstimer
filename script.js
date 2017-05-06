jQuery(function () {
    var $ = jQuery;

    const addTimeElement = function (time, text) {
        return '<span class="time">' + time + '</span><span class="text">' + text + "</span>";
    };

    const switchLang = function (number, index) {
        var key = '';
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

        if (delta > 0) {
            delta -= (60 * 60 * 1000);
            const time = (new Date(delta));
            const sec = time.getSeconds();
            const min = time.getMinutes();
            const hours = time.getHours();
            const days = time.getDate() + (time.getMonth() * 31) - 1;
            var $return = "";
            if (days) {
                $return += addTimeElement(days, switchLang(days, 'day'));
            }
            if (days || hours) {
                $return += addTimeElement(hours, switchLang(hours, 'hour'));
            }
            $return += addTimeElement(min, switchLang(min, 'min'));
            if (!days) {
                $return += addTimeElement(sec, switchLang(sec, 'sec'));
            }
            return $return;
        } else {
            return LANG.plugins.fkstimer['past-event'];
        }
    };
    const countDown = function ($span, deltaServer) {
        const current = (new Date()).getTime() + deltaServer;
        const deadline = (new Date($span.data('date'))).getTime();
        const delta = deadline - current;
        const text = getTimeElements(delta, deltaServer);
        $span.html(text);
        setTimeout(function () {
            countDown($span, deltaServer);
        }, 1000);
    };

    $('.fks-timer').each(function () {
        var deltaServer = (new Date($('meta[name="fks-timer"]').attr('content'))).getTime() - (new Date()).getTime();
        countDown($(this), deltaServer);
    });


});
