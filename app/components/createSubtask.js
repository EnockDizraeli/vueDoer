define(['text!components/templates/createSubtask.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        /*--Parent task that is--*/
        props: ['task'],
        data() {
            return {
                showing: false,
                name: '',
                valid: false,
                nameRules: [
                    v => !!v || 'Please type.'
                ]
            }
        },
        methods: {
            createSubtask(){
                store.dispatch('tasks/create', {
                    name: this.name,
                    parentTaskID: this.task.id,
                    projectID: this.task.projectID,
                });
                this.reset();
            },
            reset(){
                this.$refs.form.reset();
            }
        },
    });
});