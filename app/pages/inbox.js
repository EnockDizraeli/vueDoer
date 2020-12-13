define(['text!pages/templates/inbox.html','components/createTask','components/listOfTasks','store/index'],
(template, createTask, listOfTasks, store) => {
    return Vue.extend({
        template,
        components: {
            createTask,
            listOfTasks,
        },
        data() {
            return {
                projectID: null
            }
        },
        computed: {
            project(){
                return store.getters['projects/getInbox'];
            },
            tasks(){
                return store.getters['tasks/getAll'].filter(t => t.projectID === this.project.id && !t.parentTaskID);
            }
        }
    });
});