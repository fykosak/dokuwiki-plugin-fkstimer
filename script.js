//DeadlineDataSingle[date-time,series,types,integer-time]
function casodpo(timeElement, CurrentDate , deadlineDate) {
    var textToDeadline = "";

    var Ctime = CurrentDate.getTime();
    //time += 2 * 1000 * 60 * 60;

    var Dtime = deadlineDate.getTime();
    var deltatime = Dtime - Ctime;
    if (deltatime > 0) {

        var toDeadlineDays = Math.floor(deltatime / (1000 * 60 * 60 * 24));

        if (toDeadlineDays < 5) {
            textDays = dayPlN;
            if (toDeadlineDays === 1) {
                textDays = daySgN;
            }
            ;
        }
        else {
            textDays = dayPlG;
        }
        ;
        deltatime += -(toDeadlineDays * 1000 * 60 * 60 * 24);

        var toDeadlineHours = Math.floor(deltatime / (1000 * 60 * 60));

        if (toDeadlineHours < 5) {
            textHours = hourPlN;
            if (toDeadlineHours === 1) {
                textHours = hourSgN;
            }
            ;

        }
        else {
            textHours = hourPlG;
        }
        ;

        deltatime += -(toDeadlineHours * 1000 * 60 * 60);

        var toDeadlineMinute = Math.floor(deltatime / (1000 * 60));
        if (toDeadlineMinute < 5) {
            textMinute = minPlN;
            if (toDeadlineMinute === 1) {
                textMinute = minSgN;
            }
            ;
        }
        else {
            textMinute = minPlG;
        }
        ;
        deltatime += -(toDeadlineMinute * 1000 * 60);

        var toDeadlineSeconds = Math.floor(deltatime / (1000));
        if (toDeadlineSeconds < 5) {
            textSeconds = secPlN;
            if (toDeadlineSeconds === 1) {
                textSeconds = secSgN;
            }
            ;
        }
        else {
            textSeconds = secPlG;
        }
        ;

        // display time 
        if (!toDeadlineDays && toDeadlineSeconds % 2 && !toDeadlineHours && toDeadlineMinute < 31) {
            colorText = "#ff7e00";
        }
        else
            colorText = "black";

        if (toDeadlineDays) {
            textToDeadline = textToDeadline + "<span style='font-size:20px; color:" + colorText + ";font-weight:bold;'> " + toDeadlineDays + "</span><span style='font-size:10px;'> " + textDays + "</span>";
        }
        ;
        if (toDeadlineDays || toDeadlineHours) {
            textToDeadline = textToDeadline + "<span style='font-size:20px; color:" + colorText + ";font-weight:bold;'> " + toDeadlineHours + "</span><span style='font-size:10px;'> " + textHours + "</span>";
        }
        ;
        textToDeadline += "</span><span style='font-size:20px; color:" + colorText + ";font-weight:bold;'> " + toDeadlineMinute + "</span><span style='font-size:10px;'> " + textMinute + "</span>";
        if (!toDeadlineDays) {
            textToDeadline += "<span style='font-size:20px; color:" + colorText + ";font-weight:bold;'> " + toDeadlineSeconds + "</span><span style='font-size:10px;'> " + textSeconds + "</span>";
        }
        ;
    }
    else {
        textToDeadline += pastevent;
    }
    
    timeElement.innerHTML = textToDeadline;

    setTimeout(function() {
        casodpo(timeElement,CurrentDate, deadlineDate);
    }, 1000);
}
var $ = jQuery;
$(function() {$('span.deadline').each(function() {casodpo(this, new Date(currentDate),new Date($(this).text()));});});
