define(['text!components/templates/subtaskChip.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        props: ['task'],
        computed: {
            subtasks(){
                return store.getters['tasks/getAll'].filter(t => t.parentTaskID === this.task.id);
            },
            completed(){
                return this.subtasks.filter(t => t.completed).length >= this.subtasks.length;
            },
            color(){
                return (this.completed) ? 'green' : 'transparent';
            },
            textColor(){
                return (this.completed) ? 'white' : 'blue-grey darken-2';
            }
        }
    });
});