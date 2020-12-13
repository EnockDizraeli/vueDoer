define(['text!components/templates/quickAddTask.html','components/scheduleTask','store/index'],
(template, scheduleTask, store) => {

    let recentProjectID = {
        set(){

        },
        get(){

        }
    };

    return Vue.extend({
        template,
        components: {
            scheduleTask
        },
        data() {
            return {
                name: '',
                dialog: false,
                valid: false,
                nameRules: [
                    v => !!v || 'Please type.'
                ],
                projectID: 'inbox'
            }
        },
        computed: {
            projects(){
                return store.getters['projects/getAllandInbox'];
            }
        },
        methods: {
            createTask(){
                store.dispatch('tasks/create', {
                    name: this.name,
                    projectID: this.projectID,
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
        },
    });
});