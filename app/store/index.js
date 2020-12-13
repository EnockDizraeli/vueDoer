define(['store/modules/projects/index','store/modules/tasks/index','store/offlineDB'],
(projects, tasks, offlineDB) => {
    const store = new Vuex.Store({
        modules: {
            projects,
            tasks
        }
    });

    /**Get offline data */
    offlineDB.init( store );
    return store;
});