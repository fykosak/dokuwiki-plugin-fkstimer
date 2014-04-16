//DeadlineDataSingle[date-time,series,types,integer-time]
function deadlinesAll(maxline, DeadlineDataSingle) {
    timeElement = document.getElementById("AllDeadline");
    timeElement.innerHTML = "";
    var CurrentDate = new Date();
    var time = CurrentDate.getTime();
    time -= 1000 * 60 * 60 * 24 * 2;
    for (var i = 1; i < maxline; i++) {
        var DeadDate = new Date(DeadlineDataSingle[i][0]);
        DeadlineDataSingle[i][3] = DeadDate.getTime();
        DeadlineDataSingle[i][3] -= time;
    }
    ;
    var DeadOnlCurrentPo = new Array();
    var DeadOnlCurrentUp = new Array();
    DeadOnlCurrentPo[3] = 1000 * 60 * 60 * 24 * 365;
    for (var i = maxline - 1; i >= 0; i--) {
        if (DeadlineDataSingle[i][2] === 'SP' || DeadlineDataSingle[i][2] === 'PP') {
            if ((DeadlineDataSingle[i][3] > 0) && (DeadOnlCurrentPo[3] > DeadlineDataSingle[i][3])) {
                DeadOnlCurrentPo[0] = DeadlineDataSingle[i][0];
                DeadOnlCurrentPo[1] = DeadlineDataSingle[i][1];
                DeadOnlCurrentPo[2] = DeadlineDataSingle[i][2];
                DeadOnlCurrentPo[3] = DeadlineDataSingle[i][3];
            }
            ;
        }
        ;
    }
    ;
    if (DeadOnlCurrentPo[2] === 'SP' || DeadOnlCurrentPo[2] === 'PP') {
        for (var i = 0; i < maxline; i++) {
            if (DeadOnlCurrentPo[2] === 'SP' && DeadlineDataSingle[i][2] === 'SU' && DeadlineDataSingle[i][1] === DeadOnlCurrentPo[1]) {
                DeadOnlCurrentUp[0] = DeadlineDataSingle[i][0];
                DeadOnlCurrentUp[1] = DeadlineDataSingle[i][1];
                DeadOnlCurrentUp[2] = DeadlineDataSingle[i][2];
                DeadOnlCurrentUp[3] = DeadlineDataSingle[i][3];
            }
            ;
            if (DeadOnlCurrentPo[2] === 'PP' && DeadlineDataSingle[i][2] === 'PU' && DeadlineDataSingle[i][1] === DeadOnlCurrentPo[1]) {
                DeadOnlCurrentUp[0] = DeadlineDataSingle[i][0];
                DeadOnlCurrentUp[1] = DeadlineDataSingle[i][1];
                DeadOnlCurrentUp[2] = DeadlineDataSingle[i][2];
                DeadOnlCurrentUp[3] = DeadlineDataSingle[i][3];
            }
            ;
        }
        ;
    }
    ;
    for (var i = 0; i < maxline; i++) {
        if (DeadlineDataSingle[i][2] === 'TA' && DeadlineDataSingle[i][3] < (30 * 24 * 6 * 60 * 1000)) {
            timeElement.innerHTML += 'Do letního tábora výfuku zbýva<br><span class="deadline">' + DeadlineDataSingle[i][0] + '</span><br>';

        }
    }
    ;
    var SeriesName = new Array('nulté', 'první', 'druhé', 'třetí', 'štvrté', 'páte', 'šesté');
    if (DeadOnlCurrentUp[2] === 'PU' || DeadOnlCurrentPo[2] === 'PP') {
        timeElement.innerHTML += 'Do konce ' + SeriesName[DeadOnlCurrentPo[1]] + ' prázdninové série zbývá: <br><span class="deadline">' + DeadOnlCurrentPo[0] + '</span><br>';
        timeElement.innerHTML += 'Do konce uploadu ' + SeriesName[DeadOnlCurrentUp[1]] + ' prázdninové série zbývá: <br><span class="deadline">' + DeadOnlCurrentUp[0] + '</span><br>';
    }
    else {
        timeElement.innerHTML += 'Do konce ' + SeriesName[DeadOnlCurrentPo[1]] + ' série zbývá: <br><span class="deadline">' + DeadOnlCurrentPo[0] + '</span><br>';
        timeElement.innerHTML += 'Do konce uploadu ' + SeriesName[DeadOnlCurrentUp[1]] + ' série zbývá: <br><span class="deadline">' + DeadOnlCurrentUp[0] + '</span><br>';
    }
    ;

    /*if(true) {timeElement.innerHTML='ahoj'}else{};
     
     var $ = jQuery;
     $(function() {
     $('AllDeadline').each(function(){
     deadlinesAll(this);
     });
     });
     */

}
;