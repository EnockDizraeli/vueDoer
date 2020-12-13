define(['text!pages/templates/project.html','components/createTask','components/listOfTasks','components/editProject','components/deleteProject','store/index'],
(template, createTask, listOfTasks, editProject, deleteProject, store) => {
    return Vue.extend({
        template,
        components: {
            createTask,
            listOfTasks,
            editProject,
            deleteProject
        },
        data() {
            return {
                projectID: null,
                projectExists: true
            }
        },
        computed: {
            project(){
                return store.getters['projects/getAll'].find(p => p.id === this.projectID);
            },
            tasks(){
                return store.getters['tasks/getAll'].filter(t => t.projectID === this.project.id && !t.parentTaskID);
            }
        },
        methods: {
            setProjectExists(){
                let self = this;
                setTimeout(() => {
                    if (!self.project){
                        self.projectExists = false;
                    }
                }, 400);
            }
        },
        beforeRouteEnter (to, from, next) {
            let projectID = to.params.id;
            next(self => {
                self.projectID = projectID;
                self.setProjectExists();
            });
        },
        beforeRouteUpdate(to, from, next){
            this.projectID = to.params.id;
            this.setProjectExists();
            next();
        }
    });
});