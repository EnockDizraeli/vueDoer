define(['store/modules/tasks/mutationTypes','DAO/factory'],
(types, DAOFactory) => {
    let DAO = DAOFactory.create('task');

    function set({ commit }, tasks){
        commit([types.SET_TASKS], tasks);
    };

    function create({commit}, task){
        task.id = createID(10);
        task.created = (new Date()).getTime();
        task.completed = false;

        DAO.create(task)
        .then(task => {
            commit([types.CREATE_TASK], task);
        });
    };

    function update({commit}, task){
        if (task.completed){
            completeSubtasks(task);
        };

        DAO.update(task.id, task)
        .then(task => {
            commit([types.UPDATE_TASK], task);
        });
    };

    function completeSubtasks(task){
        require(['store/index'], store => {
            let subtasks = store.getters['tasks/getAll'].filter(t => t.parentTaskID === task.id);
            subtasks.forEach(subtask => {
                subtask.completed = true;
                store.dispatch('tasks/update', subtask);
            });
        });
    };

    
    function remove({commit}, taskID){
        DAO.delete(taskID)
        .then(() => {
            commit([types.DELETE_TASK], taskID);
        });
    };

    return {
        set,
        create,
        update,
        delete: remove
    };
});