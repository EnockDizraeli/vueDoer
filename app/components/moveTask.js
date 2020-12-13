define(['text!components/templates/moveTask.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        props: ['task'],
        data() {
            return {
                menu: false,
                projectID: null
            }
        },
        computed: {
            projects(){
                return store.getters['projects/getAllandInbox'];
            },
            isInInbox(){
                return this.projectID === 'inbox';
            },
            isInTaskPage(){
                return this.$router.currentRoute.path.includes('task');
            }
        },
        methods: {
            moveTask(){
                this.dispatch();
                this.hide();
                this.goToProjectPage();
                showSnackbar('Task moved');
            },
            hide(){
                this.menu = false;
            },
            goToProjectPage(){
                let precedent = ( this.isInInbox ) ? '/inbox' : `/project/${this.projectID}`;
                let path = (this.isInTaskPage) ? `${precedent}/task/${this.task.id}` : precedent;
                this.$router.replace(path);
            },
            dispatch(){
                let task = Object.assign({}, this.task);
                task.projectID = this.projectID;
                store.dispatch('tasks/update', task);
            }
        },
        created() {
            this.projectID = this.task.projectID;
        },
    });
});