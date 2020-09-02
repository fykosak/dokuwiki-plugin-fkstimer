jQuery(function () {
    "use strict";
    const step = 1000;

    const addTimeElement = (time, text) => {
        return '<span class="time">' + time + '</span><span class="text">' + text + "</span>";
    };

    const switchLang = (number, index) => {
        let key;
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
        return LANG.plugins.timer[index + key];
    };

    const getTimeElements = (delta) => {
        if (delta < 0) {
            return LANG.plugins.timer['past-event'];
        }
        delta -= (60 * 60 * 1000);
        const time = (new Date(delta));
        const hours = time.getHours();
        const days = time.getDate() + (time.getMonth() * 31) - 1;

        let html = '';
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
    const countDown = (element, deltaServer) => {
        const current = (new Date()).getTime() + deltaServer;
        const deadline = (new Date(element.getAttribute('data-date'))).getTime();
        const delta = deadline - current;
        element.innerHTML = getTimeElements(delta, deltaServer);
        setTimeout(() => {
            countDown(element, deltaServer);
        }, step);
    };

    document.querySelectorAll('.timer').forEach((element) => {
        const content = document.querySelector('meta[name="timer"]').getAttribute('content');
        const deltaServer = (new Date(content)).getTime() - (new Date()).getTime();
        countDown(element, deltaServer);
    });
});
