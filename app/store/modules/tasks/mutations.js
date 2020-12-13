define(['store/modules/tasks/mutationTypes'],
(types) => {
    return {
        [types.SET_TASKS](state, tasks){
            state.tasks = [];
            tasks.forEach(task => {
                state.tasks.push( task );
            });
        },
        [types.CREATE_TASK](state, task){
            state.tasks.push( task );
        },
        [types.UPDATE_TASK](state, task){
            let taskIndex = state.tasks.indexOf( state.tasks.find(b => String(b.id) === String(task.id)) );
            for(let prop in task){
                state.tasks[taskIndex][prop] = task[prop];
            }
        },
        [types.DELETE_TASK](state, id){
            let index = state.tasks.indexOf( state.tasks.find(c => String(c.id) === String(id)) );
            state.tasks.splice(index, 1);
        }
    };
});