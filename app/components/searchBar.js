define(['text!components/templates/searchBar.html','components/searchResults','Fuse','store/index'],
(template, searchResults, Fuse, store) => {
    return Vue.extend({
        template,
        data() {
            return {
                keyword: '',
                results: []
            }
        },
        computed: {
            allTasks(){
                return store.getters['tasks/getAll'];
            },
            allProjects(){
                return store.getters['projects/getAll'];
            },
            menu(){
                return (/\S/).test( this.keyword );
            }
        },
        watch: {
            keyword(val){
                this.results = [];
                this.updateResults();
            }
        },
        components: {
            searchResults
        },
        methods: {
            updateResults(){
                this.updateTaskResults();
                this.updateProjectResults();
            },
            updateTaskResults(){
                this.addToResults( 
                    this.search( this.allTasks ).map((task) => {
                        task.type = 'TASK';
                        return task;
                    })
                );
            },
            updateProjectResults(){
                this.addToResults( 
                    this.search( this.allProjects ).map((project) => {
                        project.type = 'PROJECT';
                        return project;
                    })
                );
            },
            search(list, keys = ['name']){
                let options = {keys};
                let fuse = new Fuse(list, options);
                return fuse.search(`=${this.keyword}`).map(r => r.item);
            },
            addToResults(arr){
                arr.forEach(item => {
                    this.results.push(item);
                });
            }
        },
    });
});