define(['store/modules/projects/mutationTypes','DAO/Factory'],
(types, DAOFactory) => {
    let DAO = DAOFactory.create('project');

    function set({ commit }, projects){
        commit([types.SET_PROJECTS], projects);
    };

    function create({commit}, project){
        project.id = createID(10);
        project.created = (new Date()).getTime();

        DAO.create(project)
        .then(project => {
            commit([types.CREATE_PROJECT], project);
        });
    };

    function update({commit}, project){
        DAO.update(project.id, project)
        .then(project => {
            commit([types.UPDATE_PROJECT], project);
        });
    };
    
    function remove({commit}, projectID){
        DAO.delete(projectID)
        .then(() => {
            commit([types.DELETE_PROJECT], projectID);
        });
    };

    return {
        set,
        create,
        update,
        delete: remove
    };
});