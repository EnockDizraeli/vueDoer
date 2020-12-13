define(['text!pages/templates/task.html','components/listOfTasks','components/createSubtask','components/updateTaskSchedule',
'components/editTaskName','components/taskMenu','store/index'],
(template, listOfTasks, createSubtask, updateTaskSchedule, editTaskName, taskMenu, store) => {
    return Vue.extend({
        template,
        data() {
            return {
                dialog: true,
                taskID: null,
                tab: null,
                editMode: false
            }
        },
        components: {
            listOfTasks,
            createSubtask,
            updateTaskSchedule,
            editTaskName,
            taskMenu
        },
        computed: {
            project(){
                return store.getters['projects/getAllandInbox'].find(p => p.id === this.task.projectID);
            },
            task(){
                return store.getters['tasks/getAll'].find(t => t.id === this.taskID);
            },
            subtasks(){
                return store.getters['tasks/getAll'].filter(t => t.parentTaskID === this.task.id);
            }
        },
        methods: {
            handleEvents(){
                this.$refs.dialog.$on('click:outside',() => this.goBack());
            },
            goBack(){
                this.$router.back();
            }
        },
        mounted() {
            this.handleEvents();
        },
        beforeRouteEnter (to, from, next) {
            next(self => {
                self.taskID = to.params.taskID;
                self.dialog = true;
            });
        },
        beforeRouteUpdate(to, from, next){
            this.taskID = to.params.taskID;
            this.dialog = true;
            next();
        }
    });
});