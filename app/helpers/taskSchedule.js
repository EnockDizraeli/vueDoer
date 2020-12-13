define(['moment'],
(moment) => {

    let now = moment();

    function isToday(schedule){
        if (!schedule) return false;
        let day = moment(schedule.date);
        return ( isSameDay(day, now));
    };

    function isTaskScheduledOn(task, date){
        if (!task.schedule) return false;
        return isSameDay( moment(task.schedule.date) , date);
    };

    function isSameDay(dayA, dayB){
        return isSameDayOfYear(dayA, dayB) && isSameYear(dayA, dayB);
    };

    function isSameYear(dayA, dayB){
        return dayA.year() === dayB.year();
    };
    
    function isSameDayOfYear(dayA, dayB){
        return dayA.dayOfYear() === dayB.dayOfYear();
    };



    function getDays(count){
        let today =  moment(new Date());
        let days = new Array(count).fill(0).map((value, index) => {
            return today.add(index, 'days').clone();
        });
        return days;
    };

    return {
        isToday,
        isTaskScheduledOn,
        getDays
    }
});
