define(['text!components/templates/createTask.html','components/scheduleTask','store/index'],
(template, scheduleTask, store) => {
    return Vue.extend({
        template,
        props: {
            project: {
                required: true,
            },
            date: {
                required: false,
                default: null
            }
        },
        components: {
            scheduleTask
        },
        data() {
            return {
                showing: false,
                name: '',
                nameRules: [
                    v => !!v || 'Please type something'
                ],
                valid: false
            }
        },
        methods: {
            createTask(){
                if (!this.valid) return;
                store.dispatch('tasks/create', {
                    name: this.name,
                    projectID: this.project.id,
                    schedule : this.getSchedule() 
                });
                this.reset();
            },
            getSchedule(){
                return this.$refs.scheduler.getSchedule();
            },
            reset(){
                this.name = '';
                this.$refs.scheduler.clearSchedule();
            }
        }
    });
});