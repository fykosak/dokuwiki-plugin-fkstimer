//DeadlineDataSingle[date-time,series,types,integer-time]
function casodpo(timeElement, Ctime, deadlineDate) {
    var textToDeadline = "";

    Ctime += 1000;

    var Dtime = deadlineDate.getTime();
    var deltatime = Dtime - Ctime;
    if (deltatime > 0) {

        var toDeadlineDays = Math.floor(deltatime / (1000 * 60 * 60 * 24));
        var textDays = switchlang(toDeadlineDays, daySgN, dayPlN, dayPlG);
        deltatime += -(toDeadlineDays * 1000 * 60 * 60 * 24);

        var toDeadlineHours = Math.floor(deltatime / (1000 * 60 * 60));
        var textHours = switchlang(toDeadlineHours, hourSgN, hourPlN, hourPlG);
        deltatime += -(toDeadlineHours * 1000 * 60 * 60);

        var toDeadlineMinute = Math.floor(deltatime / (1000 * 60));
        var textMinute = switchlang(toDeadlineMinute, minSgN, minPlN, minPlG);
        deltatime += -(toDeadlineMinute * 1000 * 60);

        var toDeadlineSeconds = Math.floor(deltatime / (1000));
        var textSeconds = switchlang(toDeadlineSeconds, secSgN, secPlN, secPlG);

        // display time 
        if (!toDeadlineDays && toDeadlineSeconds % 2 && !toDeadlineHours && toDeadlineMinute < 31) {
            colorText = "__extern__";
        }
        else {
            colorText = "__text__";
        }
        if (toDeadlineDays) {
            textToDeadline = textToDeadline + "<span style='font-size:130%; color:" + colorText + ";font-weight:bold;'> " + toDeadlineDays + "</span><span style='font-size:100%;'> " + textDays + "</span>";
        }
        ;
        if (toDeadlineDays || toDeadlineHours) {
            textToDeadline = textToDeadline + "<span style='font-size:130%; color:" + colorText + ";font-weight:bold;'> " + toDeadlineHours + "</span><span style='font-size:100%;'> " + textHours + "</span>";
        }
        ;
        textToDeadline += "</span><span style='font-size:130%; color:" + colorText + ";font-weight:bold;'> " + toDeadlineMinute + "</span><span style='font-size:100%;'> " + textMinute + "</span>";
        if (!toDeadlineDays) {
            textToDeadline += "<span style='font-size:130%; color:" + colorText + ";font-weight:bold;'> " + toDeadlineSeconds + "</span><span style='font-size:100%;'> " + textSeconds + "</span>";
        }
        ;
    }
    else {
        textToDeadline += pastevent;
    }

    timeElement.innerHTML = textToDeadline;

    setTimeout(function() {
        casodpo(timeElement, Ctime, deadlineDate);
    }, 1000);
}

function switchlang(number, SgN, PlN, PlG) {
    switch (number) {
        case 0:
            text = PlG;
            break;
        case 1:
            text = SgN;
            break;
        case 2:
            text = PlN;
            break;
        case 3:
            text = PlN;
            break;
        case 4:
            text = PlN;
            break;
        default:
            text = PlG;


    }
    ;
    return text;
}
;
var $ = jQuery;
$(function() {
    $('span.deadline').each(function() {
        casodpo(this, (new Date(currentDate)).getTime(), new Date($(this).text()));
    });
});
