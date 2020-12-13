define(['store/modules/projects/mutationTypes'],
(types) => {
    return {
        [types.SET_PROJECTS](state, projects){
            state.projects = [];
            projects.forEach(project => {
                state.projects.push( project );
            });
        },
        [types.CREATE_PROJECT](state, project){
            state.projects.push( project );
        },
        [types.UPDATE_PROJECT](state, project){
            let projectIndex = state.projects.indexOf( state.projects.find(b => String(b.id) === String(project.id)) );
            for(let prop in project){
                state.projects[projectIndex][prop] = project[prop];
            }
        },
        [types.DELETE_PROJECT](state, id){
            let index = state.projects.indexOf( state.projects.find(c => String(c.id) === String(id)) );
            state.projects.splice(index, 1);
        }
    };
});