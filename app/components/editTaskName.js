define(['text!components/templates/editTaskName.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        props: ['task'],
        data() {
            return {
                taskName: '',
                nameRules: [
                    v => !!v || 'Please type in a name'
                ],
                valid: false
            }
        },
        methods: {
            updateTask(){
                this.dispatch();
                this.$emit('complete');
            },
            dispatch(){
                let task = Object.assign({}, this.task);
                task.name = this.taskName;
                store.dispatch('tasks/update', task);
            }
        },
        created() {
            this.taskName = this.task.name;
        },
    });
});