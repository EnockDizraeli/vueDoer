define(['text!pages/templates/today.html','moment','store/index','components/listOfTasks','components/createTask'],
(template, moment, store, listOfTasks, createTask) => {

    let isToday = (() => {
        let now = moment();

        return function(schedule){
            if (!schedule) return false;
            let day = moment(schedule.date);
            return ( isSameYear(day, now) && isSameDayOfYear(day, now));
        };
        
        function isSameYear(dayA, dayB){
            return dayA.year() === dayB.year();
        };
         
        function isSameDayOfYear(dayA, dayB){
            return dayA.dayOfYear() === dayB.dayOfYear();
        };
    })()


    return Vue.extend({
        template,
        components: {
            listOfTasks,
            createTask
        },
        data() {
            return {
                today: moment(new Date().toISOString().substr(0, 10)).format('dddd MMM Do'),
                todayDate: new Date().toISOString().substr(0, 10)
            }
        },
        computed: {
            tasks(){
                return store.getters['tasks/getAll'].filter(t => isToday(t.schedule));
            },
            project(){
                return store.getters['projects/getInbox'];
            }
        },
    });
});