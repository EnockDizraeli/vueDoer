requirejs.config({
    paths: {
        'Dexie': '../thirdParty/dexie.min',
        'moment': '../thirdParty/moment.min',
        'Fuse': '../thirdParty/fuse.min',
    },
    waitSeconds: 0
});

require(['text','components/snackbar','components/appHeader','components/createTask','components/navigation','store/index','helpers/IDCreator','router'],
(text, snackbar, appHeader, createTask, navigation, store, IDCreator, router) => {
    let app;

    window.createID = IDCreator.create;
    window.showSnackbar = function(text){
        app.$refs.snackbar.show(text);
    };
    
    app = new Vue({
        router,
        el: '#app',
        vuetify: new Vuetify(),
        components: {
            appHeader,
            createTask,
            navigation,
            snackbar
        },
        data() {
            return {
            }
        },
        computed: {
            tasks(){
                return store.getters['getAll'];
            }
        },
        methods: {
            removePreloader(){
                document.body.removeChild(
                    document.getElementById('preloader')
                );
            }
        },
        mounted() {
            this.removePreloader();
        },
    });
});