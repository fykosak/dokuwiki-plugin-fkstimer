

jQuery(function () {
    var $ = jQuery;
    $('span.FKS_timer_deadline').each(function () {
        var delta_server = (new Date($('meta[name=FKS_timer]').attr('content'))).getTime() - (new Date()).getTime();
        
        casodpo($(this), delta_server);

    });
    function casodpo($span, delta_server) {

        var current = (new Date()).getTime()+delta_server;

        var deadline = (new Date($span.data('date'))).getTime();
        var delta = deadline - current;

        var text = _get_time(delta, delta_server);

        $span.html(text) ;
        
        setTimeout(function () {
            casodpo($span,delta_server);
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
                $return += _add_timer_span(days, switchlang(days, LANG.plugins.fkstimer.daySgN, LANG.plugins.fkstimer.dayPlN, LANG.plugins.fkstimer.dayPlG));
            }
            ;
            if (days || hours) {
                $return += _add_timer_span(hours, switchlang(hours, LANG.plugins.fkstimer.hourSgN, LANG.plugins.fkstimer.hourPlN, LANG.plugins.fkstimer.hourPlG));
            }
            ;
            $return += _add_timer_span(min, switchlang(min, LANG.plugins.fkstimer.minSgN, LANG.plugins.fkstimer.minPlN, LANG.plugins.fkstimer.minPlG));
            if (!days) {
                $return += _add_timer_span(sec, switchlang(sec, LANG.plugins.fkstimer.secSgN, LANG.plugins.fkstimer.secPlN, LANG.plugins.fkstimer.secPlG));
            }
            ;
            return $return;
        }
        else {
            return LANG.plugins.fkstimer.pastevent;
        }
    }
    ;
    function _add_timer_span(time, text) {
        return '<span class="FKS_timer_time">' + time + '</span><span class="FKS_timer_text">' + text + "</span>";
    }
    ;
});
