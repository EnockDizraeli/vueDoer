define(['text!components/templates/taskProjectChip.html','store/index'],
(template, store) => {
    return Vue.extend({
        template,
        props: ['task'],
        computed: {
            project(){
                return store.getters['projects/getAllandInbox'].find(p => p.id === this.task.projectID);
            }
        },
    });
});