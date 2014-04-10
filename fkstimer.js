//DeadlineDataSingle[date-time,series,types,integer-time]
function deadlinesAll(maxline,DeadlineDataSingle){
    timeElement=document.getElementById("AllDeadline");
    timeElement.innerHTML="";
    var CurrentDate=new Date();
    var time=CurrentDate.getTime();
    time-=1000*60*60*24*2;
    for (var i=1;i<maxline;i++){
        var DeadDate=new Date(DeadlineDataSingle[i][0]);
        DeadlineDataSingle[i][3]=DeadDate.getTime();
        DeadlineDataSingle[i][3]-=time; 
    };
    var DeadOnlCurrentPo=new Array();
    var DeadOnlCurrentUp=new Array();
    DeadOnlCurrentPo[3]=1000*60*60*24*365;
        for(var i=maxline-1;i>=0;i--){
            if(DeadlineDataSingle[i][2]==='SP'||DeadlineDataSingle[i][2]==='PP'){
                if((DeadlineDataSingle[i][3]>0)&&(DeadOnlCurrentPo[3]>DeadlineDataSingle[i][3])){
                    DeadOnlCurrentPo[0]=DeadlineDataSingle[i][0];
                    DeadOnlCurrentPo[1]=DeadlineDataSingle[i][1];
                    DeadOnlCurrentPo[2]=DeadlineDataSingle[i][2];
                    DeadOnlCurrentPo[3]=DeadlineDataSingle[i][3];
                };                
            };
        };
   if(DeadOnlCurrentPo[2]==='SP'||DeadOnlCurrentPo[2]==='PP'){
       for(var i=0;i<maxline;i++){
           if(DeadOnlCurrentPo[2]==='SP'&&DeadlineDataSingle[i][2]==='SU'&&DeadlineDataSingle[i][1]===DeadOnlCurrentPo[1]){
               DeadOnlCurrentUp[0]=DeadlineDataSingle[i][0];
               DeadOnlCurrentUp[1]=DeadlineDataSingle[i][1];
               DeadOnlCurrentUp[2]=DeadlineDataSingle[i][2];
               DeadOnlCurrentUp[3]=DeadlineDataSingle[i][3];
          };
          if(DeadOnlCurrentPo[2]==='PP'&&DeadlineDataSingle[i][2]==='PU'&&DeadlineDataSingle[i][1]===DeadOnlCurrentPo[1]){
               DeadOnlCurrentUp[0]=DeadlineDataSingle[i][0];
               DeadOnlCurrentUp[1]=DeadlineDataSingle[i][1];
               DeadOnlCurrentUp[2]=DeadlineDataSingle[i][2];
               DeadOnlCurrentUp[3]=DeadlineDataSingle[i][3];
          };
       };
   };
   for(var i=0;i<maxline;i++){
       if(DeadlineDataSingle[i][2]==='TA'&&DeadlineDataSingle[i][3]<(30*24*6*60*1000)){
           timeElement.innerHTML+='Do letního tábora výfuku zbýva<br><span class="deadline">'+DeadlineDataSingle[i][0]+'</span><br>';
           
       }
   };
var SeriesName= new Array('nulté','první','druhé','třetí','štvrté','páte','šesté');
if(DeadOnlCurrentUp[2]==='PU'||DeadOnlCurrentPo[2]==='PP'){
    timeElement.innerHTML+='Do konce '+SeriesName[DeadOnlCurrentPo[1]]+' prázdninové série zbývá: <br><span class="deadline">'+DeadOnlCurrentPo[0]+'</span><br>';
    timeElement.innerHTML+='Do konce uploadu '+SeriesName[DeadOnlCurrentUp[1]]+' prázdninové série zbývá: <br><span class="deadline">'+DeadOnlCurrentUp[0]+'</span><br>';
}
else{
   timeElement.innerHTML+='Do konce '+SeriesName[DeadOnlCurrentPo[1]]+' série zbývá: <br><span class="deadline">'+DeadOnlCurrentPo[0]+'</span><br>';
    timeElement.innerHTML+='Do konce uploadu '+SeriesName[DeadOnlCurrentUp[1]]+' série zbývá: <br><span class="deadline">'+DeadOnlCurrentUp[0]+'</span><br>'; 
};

/*if(true) {timeElement.innerHTML='ahoj'}else{};

var $ = jQuery;
$(function() {
	$('AllDeadline').each(function(){
		deadlinesAll(this);
	});
});
*/

};


function casodpo(timeElement, deadlineDate){
    var CurrentDate=new Date();
    var time=CurrentDate.getTime();
    time+=2*1000*60*60;
    //var month=CurrentDate.getMonth();
    //var date=CurrentDate.getDate();
    //var hours=CurrentDate.getHours();
    //var minutes=CurrentDate.getMinutes();
    //var seconds=CurrentDate.getSeconds();
    //if (minutes<=9) minutes="0"+minutes;
    //if (seconds<=9) seconds="0"+seconds;
    //var currentTime=hours+":"+minutes+":"+seconds;
    // new dedline
    //var deadlineDate=new Date('2014-05-15T15:25:05')
    //var Dmonth=deadlineDate.getMonth();
    //var Ddate=deadlineDate.getDate();
    //var Dhours=deadlineDate.getHours();
    //var Dminutes=deadlineDate.getMinutes();
    //var Dseconds=deadlineDate.getSeconds();
    var Dtime=deadlineDate.getTime();
    var deltatime=Dtime-time;
    if(deltatime>0){

        var toDeadlineDays=Math.floor(deltatime/(1000*60*60*24));
        var textToDeadline="";

        if (toDeadlineDays<5) {
            textDays="dnů";
            if (toDeadlineDays===1) {
                textDays="den";
            };
        }
        else {
            textDays="dní" ;
        };
        deltatime+=-(toDeadlineDays*1000*60*60*24);

        var toDeadlineHours=Math.floor(deltatime/(1000*60*60));

        if (toDeadlineHours<5) {
            textHours="hodiny";
            if (toDeadlineHours===1) {
                textHours="hodina";
            };
        }
        else {
            textHours="hodin";
        };
        deltatime+=-(toDeadlineHours*1000*60*60);

        var toDeadlineMinute=Math.floor(deltatime/(1000*60));
        if (toDeadlineMinute<5) {
            textMinute="minuty";
            if (toDeadlineMinute===1) {
                textMinute="minuta"; 
            };
        }
        else {
            textMinute="minut";
        };
        deltatime+=-(toDeadlineMinute*1000*60);

        var toDeadlineSeconds=Math.floor(deltatime/(1000));
        if (toDeadlineSeconds<5) {
            textSeconds="sekundy";
            if (toDeadlineSeconds===1) {
                textSeconds="sekunda";
            };
        }
        else {textSeconds="sekund";
        };
        if(!toDeadlineDays&&toDeadlineSeconds%2&&!toDeadlineHours&&toDeadlineMinute<31){
            colorText="#ff7e00";
        }
        else colorText="black";

        if (toDeadlineDays) {
            textToDeadline=textToDeadline+"<span style='font-size:20px; color:"+colorText+";font-weight:bold;'> "+toDeadlineDays+"</span><span style='font-size:10px;'> "+textDays+"</span>";
        };


        if (toDeadlineDays||toDeadlineHours) {
            textToDeadline=textToDeadline+"<span style='font-size:20px; color:"+colorText+";font-weight:bold;'> "+toDeadlineHours+"</span><span style='font-size:10px;'> "+textHours+"</span>";
        };


        textToDeadline+= "</span><span style='font-size:20px; color:"+colorText+";font-weight:bold;'> "+toDeadlineMinute+"</span><span style='font-size:10px;'> "+textMinute+"</span>";
        if(!toDeadlineDays){
            textToDeadline+="<span style='font-size:20px; color:"+colorText+";font-weight:bold;'> "+toDeadlineSeconds+"</span><span style='font-size:10px;'> "+textSeconds+"</span>";
        };
    }
    else{
        textToDeadline+="termin už ubehol";
    };
    timeElement.innerHTML=textToDeadline;
    //};
    setTimeout(function() {casodpo(timeElement, deadlineDate);},1000);
};


var $ = jQuery;
$(function() {
	$('span.deadline').each(function(){
		casodpo(this, new Date($(this).text()));
	});
});
