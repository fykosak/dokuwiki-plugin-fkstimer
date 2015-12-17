
jQuery(function () {
    var $ = jQuery;
    $('div.FKS_timer_deadline').each(function () {
        var data = {};
        data.delta_server = (new Date($('meta[name=FKS_timer]').attr('content'))).getTime() - (new Date()).getTime();
        data.count = $(this).data("count");
        timer($(this), data);


    });
    function timer($div, data) {
        var current = (new Date()).getTime() + data.delta_server;
        var deadline = (new Date($div.data('date'))).getTime();
        var delta = deadline - current;
        var deley = 0;
        if (data.count === "none") {
            $div.find('.timer').hide();
            if (delta < 0) {
                $div.find('.text-after').show();
                $div.find('.text-before').hide();
            } else {
                $div.find('.text-after').hide();
                $div.find('.text-before').show();
            }
            deley = Math.abs(delta);
        } else {
            $div.find('.text-after').hide();
            $div.find('.text-before').hide();
            if (data.count == "up") {
                delta = -delta;
            }
            var $data = {};

            $data = _get_time(delta, data.delta_server);
            var text = "";
            if ($.isEmptyObject($data)) {
                $div.find('.timer').hide();
                if (data.count === "up") {
                    $div.find('.text-before').show();
                } else {
                    $div.find('.text-after').show();
                }
            } else {
                var $elm = {};
                if ($data.days) {
                    $elm.days = $data.days;
                }
                if ($data.days || $data.hours) {
                    $elm.hours = $data.hours;
                }
                $elm.min = $data.min;
                if (!$data.days) {
                    $elm.sec = $data.sec;
                }
                for (var el in $elm) {
                    text += _add_timer_span($elm[el], el);
                }
            }

            $div.find('.timer').html(text);
        }


        setTimeout(function () {
            timer($div, data);
        }, 1000 + deley);
    }


    function switchlang(number, el) {
        var name = el;
        switch (number) {
            case 0:
                name += "PlG";
                break;
            case 1:
                name += "SgN";
                break;
            case 2:
                name += "PlN";
                break;
            case 3:
                name += "PlN";
                break;
            case 4:
                name += "PlN";
                break;
            default:
                name += "PlG";
        }
        return LANG.plugins.fkstimer[name];
    }
    function _get_time(delta) {
        var $return = {};
        if (delta > 0) {
            delta -= (60 * 60 * 1000);
            var time = (new Date(delta));
            $return = {
                sec: time.getSeconds(),
                min: time.getMinutes(),
                hours: time.getHours(),
                days: (time.getDate() + (time.getMonth() * 31) - 1)
            };

        }
        return $return;
    }
    ;
    function _add_timer_span(time, el) {
        return '<span class="FKS_timer_time">' + time + '</span><span class="FKS_timer_text">' + switchlang(time, el) + "</span>";
    }
    ;
});
