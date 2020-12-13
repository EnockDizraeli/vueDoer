define(['text!components/templates/appHeader.html','components/searchBar','components/help','components/notifications','components/settings','components/quickAddTask','observers/global'],
(template, searchBar, help, notifications, settings, quickAddTask, observer) => {
    return Vue.extend({
        template,
        components: {
            help,
            notifications,
            settings,
            quickAddTask,
            searchBar
        },
        methods: {
            toggleDrawer(){
                observer.$emit('toggleDrawer');
            }
        },
    });
})