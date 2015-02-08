//DeadlineDataSingle[date-time,series,types,integer-time]
var $ = jQuery;
$(function() {
    var $ = jQuery;
    $('span.FKS_timer_deadline').each(function() {
        casodpo(this);
    });
    function casodpo($span) {
        var current = (new Date()).getTime();
        var deadline = (new Date($($span).data('date'))).getTime();
        var delta = deadline - current;
        var text = _get_time(delta);

        $span.innerHTML = text;
        setTimeout(function() {
            casodpo($span);
        }, 1000);
    }
    function switchlang(number, SgN, PlN, PlG) {
        switch (number) {
            case 0:
                return  PlG;
                break;
            case 1:
                return SgN;
                break;
            case 2:
                return  PlN;
                break;
            case 3:
                return PlN;
                break;
            case 4:
                return PlN;
                break;
            default:
                return PlG;
        }
        ;

    }
    ;
    function _get_time(delta) {


        if (delta > 0) {
            delta -= (60 * 60 * 1000);
            var time = (new Date(delta));
            var sec = time.getSeconds();
            var min = time.getMinutes();
            var hours = time.getHours();
            var days = time.getDate() + (time.getMonth() * 31) - 1;
            var $return = "";
            if (days) {
                $return += '<span class="FKS_timer_time">' + days + '</span><span class="FKS_timer_text">' + switchlang(days, daySgN, dayPlN, dayPlG) + "</span>";
            }
            ;
            if (days || hours) {
                $return += '<span class="FKS_timer_time">' + hours + '</span><span class="FKS_timer_text">' + switchlang(hours, hourSgN, hourPlN, hourPlG) + "</span>";
            }
            ;
            $return += '<span class="FKS_timer_time">' + min + '</span><span class="FKS_timer_text">' + switchlang(min, minSgN, minPlN, minPlG) + "</span>";
            if (!days) {
                $return += '<span class="FKS_timer_time">' + sec + '</span><span class="FKS_timer_text">' + switchlang(sec, secSgN, secPlN, secPlG) + "</span>";
            }
            ;
            return $return;
        }
        else {
            return pastevent;
        }
    }
});
