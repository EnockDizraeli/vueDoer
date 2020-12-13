define(['DAO/Project','DAO/Task'], 
(ProjectDAO, TaskDAO) => {
    return {
        create
    };

    function create(name){
        switch(name){
            case 'project':
            return new ProjectDAO;

            case 'task':
            return new TaskDAO;
        }
    }
});