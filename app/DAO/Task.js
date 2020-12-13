define(['DAO/Base'],
(BaseDAO) => {
    class TaskDAO extends BaseDAO{
        constructor(){
            super();
            this.tableName = 'tasks';
        }
    }

    return TaskDAO;
});