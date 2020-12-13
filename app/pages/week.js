define(['text!pages/templates/week.html','moment','components/listOfTasks','components/createTask','store/index'],
(template, moment, listOfTasks, createTask, store) => {

    function getWeek(){
        let today =  moment(new Date());
        
        let days = new Array(7).fill(0).map((value, index) => {
            let momentDate = today.clone().add(index, 'days');
            return {
                moment: momentDate.clone(),
                date: momentDate.format('ddd Do MMM'),
                name: (index === 0 ) ? 'Today' : (index === 1) ? 'Tomorrow' : momentDate.format('dddd'),
                dateISO: momentDate.format('YYYY-MM-DD')
            };
        });
        return days;
    };

    return Vue.extend({
        template,
        data() {
            return {
                days: getWeek()
            }
        },
        computed: {
            inbox(){
                return store.getters['projects/getInbox'];
            }
        },
        components: {
            listOfTasks,
            createTask
        },
        methods: {
            getTasks(date){
                return store.getters['tasks/getAll'].filter((task) => {
                    if (!task.schedule) return false;
                    return isSameDay( moment(task.schedule.date) , date);
                });
            }
        },
    });

    function isSameDay(dayA, dayB){
        return isSameDayOfYear(dayA, dayB) && isSameYear(dayA, dayB);
    };

    function isSameYear(dayA, dayB){
        return dayA.year() === dayB.year();
     };
     
    function isSameDayOfYear(dayA, dayB){
        return dayA.dayOfYear() === dayB.dayOfYear();
    };
});