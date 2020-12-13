define(['text!components/templates/task.html','components/subtaskChip','components/taskScheduleChip',
'components/taskProjectChip','components/taskMenu','store/index'],
(template, subtaskChip, taskScheduleChip, taskProjectChip, taskMenu, store) => {

    return Vue.extend({
        template,
        props: {
            task: {
                required: true,
            },
            projectChip: {
                default: false,
                required: false,
            },
            scheduleChip: {
                default: false,
                required: false,
            }
        },
        components: {
            subtaskChip,
            taskScheduleChip,
            taskProjectChip,
            taskMenu
        },
        watch: {
            task: {
                deep: true,
                handler(newTask){
                    store.dispatch('tasks/update', newTask);
                }
            }
        },
        computed: {
            taskPath(){
                let currentRoute = this.$router.currentRoute;
                let precedent = currentRoute.path.includes('project') ? `/project/${currentRoute.params.id}` 
                                : currentRoute.path.includes('today') ? `/today`
                                : currentRoute.path.includes('week') ? `/week`
                                : `/inbox`;
                return `${precedent}/task/${this.task.id}`;
            },
            subtasks(){
                return store.getters['tasks/getAll'].filter(t => t.parentTaskID === this.task.id);
            }
        }
    });
});