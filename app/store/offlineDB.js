define(['DAO/Factory'],
(DAOFactory) => {
    let store;

    return {
        init
    };

    function init(arg){
        store = arg;
        setTimeout(() => {
            loadProjects();
            loadTasks();
        }, 250);
    };

    function loadProjects(){
        getDAO('project').getAll().then(projects => {
            store.dispatch('projects/set', projects);
        });
    };

    function loadTasks(){
        getDAO('task').getAll().then(tasks => {
            store.dispatch('tasks/set', tasks);
        });
    };

    function getDAO(name){
        return DAOFactory.create(name);
    };
});