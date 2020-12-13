define([],
() => {
    return {
        getAll(state){
            return state.projects;
        },
        getAllandInbox(state){
            let projects = Object.assign([], state.projects);
            projects.push( state.inbox );
            return projects;
        },
        getInbox(){
            return {
                id: 'inbox',
                color: "#1877F2"
            }
        }
    };
});