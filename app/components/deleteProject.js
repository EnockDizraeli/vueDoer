define(['text!components/templates/deleteProject.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        props: ['project'],
        data() {
            return {
                showingDialog: false
            }
        },
        methods: {
            deleteProject(){
                store.dispatch('projects/delete', this.project.id);
                this.$router.replace('/inbox');
                showSnackbar("Project Deleted");
            }
        },
    });
});