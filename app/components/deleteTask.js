define(['text!components/templates/deleteTask.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        props: ['task'],
        methods: {
            deleteTask(){
                store.dispatch('tasks/delete', this.task.id);
                this.$emit('delete');
                showSnackbar('Task deleted');
            }
        },
    });
});