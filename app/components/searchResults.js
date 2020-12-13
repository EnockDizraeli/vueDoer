define(['text!components/templates/searchResults.html','components/listOfTasks','components/listOfProjects'],
(template, listOfTasks, listOfProjects) => {
    return Vue.extend({
        template,
        props: ['results','keyword'],
        components: {
            listOfTasks,
            listOfProjects
        },
        data() {
            return {
                show: true
            }
        },
        computed: {
            tasks(){
                return this.results.filter(r => r.type === 'TASK');
            },
            projects(){
                return this.results.filter(r => r.type === 'PROJECT');
            }
        },
    });
});