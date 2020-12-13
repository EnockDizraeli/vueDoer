define(['text!components/templates/updateTaskSchedule.html','filters/scheduleFilter','moment','store/index'],
(template, scheduleFilter, moment, store) => {

    function mixinScheduleFilter(fn){
        return function(schedule){
            let filtered = fn(schedule);
            return !schedule || filtered.toLowerCase().includes('invalid') ? 'Schedule' : filtered;
        };
    };
    scheduleFilter = mixinScheduleFilter( scheduleFilter );

    return Vue.extend({
        template,
        props: ['task'],
        filters: {
            scheduleFilter
        },
        data() {
            return {
                today: new Date().toISOString().substr(0, 10),
                date: null,
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
                this.clearDate().clearTime();
                this.dispatch();
                return this;
            },
            updateSchedule(){
                this.dispatch();
                return this;
            },
            dispatch(){
                let task = Object.assign({}, this.task);
                task.schedule = this.schedule;
                store.dispatch('tasks/update', task);
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
            },
            initSchedule(){
                this.date = this.task.schedule.date || null;
                this.time = this.task.schedule.time || null;
            }
        },
        created() {
            this.initSchedule();
        },
    });
});