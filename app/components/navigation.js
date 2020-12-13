define(['text!components/templates/navigation.html','mixins/snackbar','components/createProject','store/index','observers/global','helpers/taskSchedule'],
(template, snackbar, createProject, store, observer, { isToday , getDays, isTaskScheduledOn}) => {

    function getTodayTaskCount(){
        return store.getters['tasks/getAll'].filter(t => isToday(t.schedule)).length;
    };

    function getTaskCount(projectID){
        return store.getters['tasks/getAll'].filter(t => t.projectID === projectID).length;
    };

    function getWeekTaskCount(){
        let days = getDays(7);
        return store.getters['tasks/getAll'].filter((task) => {
            return !! days.find(day => isTaskScheduledOn(task, day));
        }).length;
    };

    return Vue.extend({
        template,
        mixins: [snackbar],
        components: {
            createProject
        },
        data() {
            return {
                routePath: this.$router.currentRoute.path,
                projectList: true,
                selectedNavItem: 0,
                navItems: [
                    {
                        title: 'Inbox', icon: 'mdi-inbox', path: '/inbox',
                        countFn: function(){ 
                            return getTaskCount('inbox');
                        },
                        iconColor: "blue lighten-1"
                    },
                    {
                        title: 'Today', icon: 'mdi-calendar-today', path: '/today', 
                        countFn: getTodayTaskCount,
                        iconColor: "green darken-1"
                    },
                    {   
                        title: 'Next 7 days', icon: 'mdi-calendar-multiple', path: '/week', 
                        countFn:  getWeekTaskCount,
                        iconColor: "deep-purple lighten-1"
                    }
                ],
                drawer: true
            }
        },
        computed: {
            projects(){
                return store.getters['projects/getAll'];
            }
        },
        methods: {
            toggleDrawer(){
                this.drawer ^= true;
            },
            handleInput(e){
                let value = this.$refs.value;
                this.$emit('input', value);
            },
            getTaskCount,
            handleEvents(){
                observer.$on('toggleDrawer', this.toggleDrawer);
                this.handleRouteEvents();
            },
            handleRouteEvents(){
                let self = this;
                require(['router'], router => {
                    router.beforeEach((to, from, next) => {
                        next();
                        self.updateRoutePath()
                    });
                });
            },
            updateRoutePath(){
                this.routePath = this.$router.currentRoute.path;
            }
        },
        created() {
            this.handleEvents();
        }
    });
})