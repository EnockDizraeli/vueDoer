define(['text!components/templates/scheduleTask.html','filters/scheduleFilter','moment'],
(template, scheduleFilter, moment) => {

    function mixinScheduleFilter(fn){
        return function(schedule){
            let filtered = fn(schedule);
            return filtered.toLowerCase().includes('invalid') ? 'Schedule task' : filtered;
        };
    };

    scheduleFilter = mixinScheduleFilter( scheduleFilter );

    return Vue.extend({
        template,
        props: {
            date: {
                required: false,
                default: null
            }
        },
        filters: {
            scheduleFilter
        },
        data() {
            return {
                today: new Date().toISOString().substr(0, 10),
                time: null,
                dialog: false,
                timeMenu: false
            }
        },
        computed: {
            timeText(){
                return (this.time === null) ? 'Set Time' : moment(this.time,'h:mm').format('h:mm A');
            },
            schedule(){
                return {
                    date: this.date,
                    time: this.time
                }
            }
        },
        methods: {
            clearSchedule(){
                return this.clearDate().clearTime();
            },
            clearDate(){
                this.date = null;
                return this;
            },
            clearTime(){
                this.time = null;
                return this;
            },
            hideDialog(){
                this.dialog = false;
            },
            hideTimePicker(){
                this.timeMenu = false;
            },
            getSchedule(){
                return (this.date === null) ? false : this.schedule;
            }
        },
    });
});